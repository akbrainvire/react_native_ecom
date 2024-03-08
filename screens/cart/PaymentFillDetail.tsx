import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import CustomModal from '../../components/generic/CustomModal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomButtonComponent from '../../components/generic/CustomButtonComponent';
import PaymentFillForm from './PaymentFillForm';
import {CommonActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {emptyCartafterOplaced} from '../../store/CartSlice';
import {addOrders} from '../../store/OrderSlice';
import {useTheme} from '../../context/ThemeContext';
import {generateRandomOrderId} from '../../helper/order';
import moment from 'moment';
const PaymentFillDetail = ({navigation, route}: any) => {
  console.log(route, 'route');
  const {selectedOption, address} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const orderItems = useSelector((state: any) => state.cart.cartItems);
  const {darkMode} = useTheme();
  const handleContinueShopping = () => {
    setModalVisible(false);

    // This is to reset the stack when order is placed and redirected to dashoard page when clicked on continue shopping
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'TabStack'}],
      }),
    );
    console.log(orderItems, 'rofauie');

    const currentDate = moment();

    const twoDaysAfter = moment(currentDate).add(2, 'days');

    const fourDaysAfter = moment(currentDate).add(4, 'days');

    const orderItemsWithOrderId = orderItems.map((item: any) => {
      const orderId = generateRandomOrderId();

      const orderDate = moment().format('LL');

      return {
        ...item,
        orderId: orderId,
        address: address,
        orderDate: orderDate,
        orderDetails: {
          orderPlaced: {
            date: currentDate.format('LL'),
            time: currentDate.format('LT'),
          },
          orderShipped: {
            date: twoDaysAfter.format('LL'),
            time: twoDaysAfter.format('LT'),
          },
          orderOutforDelivery: {
            date: fourDaysAfter.format('LL'),
            time: fourDaysAfter.format('LT'),
          },
          orderDelivered: {
            date: fourDaysAfter.format('LL'),
            time: fourDaysAfter.format('LT'),
          },
        },
      };
    });

    dispatch(addOrders(orderItemsWithOrderId));
    dispatch(emptyCartafterOplaced());
    navigation.navigate('Dashboard Screen');
  };

  const handleConfirm = () => {
    setModalVisible(true);
    setTimeout(() => {
      setTitle('Successful!');
      setDescription("Your order's placed! Thankyou.");
      setLoading(false);
    }, 3000);
  };

  const handleCancel = () => {
    setModalVisible(false);
    navigation.navigate('Cart Screen');
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: darkMode ? 'black' : 'white'},
      ]}>
      <PaymentFillForm
        paymentOption={selectedOption.value}
        darkMode={darkMode}
      />
      <CustomModal
        visible={modalVisible}
        onClose={handleContinueShopping}
        title={title}
        description={description}
        LogoComponent={() => <Icon name="gpp-good" size={80} color={'black'} />}
        loading={loading}
      />
      <View style={styles.nextbtn}>
        <CustomButtonComponent
          text="Cancel"
          color={'transparent'}
          onSubmit={handleCancel}
          textcolor={darkMode ? 'white' : 'grey'}
          width="48%"
        />
        <CustomButtonComponent
          text="Confirm"
          color={darkMode ? 'white' : 'black'}
          onSubmit={handleConfirm}
          textcolor={darkMode ? 'black' : 'white'}
          width="48%"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fff',
    paddingHorizontal: 20,
  },

  nextbtn: {
    marginTop: 'auto',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
});

export default PaymentFillDetail;
