import {View, Text, StyleSheet} from 'react-native';
import React, {useMemo, useState} from 'react';
import CustomButtonComponent from '../../components/generic/CustomButtonComponent';
import RadioButtonGroup from '../../components/generic/RadioButtonGroup';
import CustomModal from '../../components/generic/CustomModal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CommonActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {emptyCartafterOplaced} from '../../store/CartSlice';
import {addOrders} from '../../store/OrderSlice';
import {useTheme} from '../../context/ThemeContext';
import {generateRandomOrderId} from '../../helper/order';
import moment from 'moment';
import {City} from 'country-state-city';

const PaymentScreen = ({navigation, route}: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const orderItems = useSelector((state: any) => state.cart.cartItems);
  const {address} = route.params;
  // console.log('🚀 ~ PaymentScreen ~ address:', address);
  const handleContinueShopping = () => {
    setModalVisible(false);
    // This is to reset the stack when order is placed and redirected to dashoard page when clicked on continue shopping
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'TabStack'}],
      }),
    );

    const currentDate = moment();

    const twoDaysAfter = moment(currentDate).add(2, 'days');

    const fourDaysAfter = moment(currentDate).add(4, 'days');

    const GetRandomCity = () => {
      const cities = City.getCitiesOfCountry(address.country.isoCode);

      let randBetweenOneAndFifty = Math.floor(
        Math.random() * (cities?.length || 0),
      );
      // console.log(cities, 'allcities');
      return cities && cities[randBetweenOneAndFifty];
    };

    const orderItemsWithOrderId = orderItems.map((item: any) => {
      const orderId = generateRandomOrderId();

      const orderDate = moment().format('LL');

      const randomCity: any = GetRandomCity();

      const orderInfo = {
        orderPlacedCity: randomCity?.name,
        orderShippedCity: randomCity?.name,
        orderOutforDeliveryCity: address.city.name,
        orderDeliveredCity: address.city.name,
        orderPlacedLocation: {
          latitude: 1 * randomCity?.latitude,
          longitude: 1 * randomCity?.longitude,
        },
        orderDeliveredLocation: {
          latitude: address.city?.latitude,
          longitude: address.city?.longitude,
        },
      };

      return {
        ...item,
        orderId: orderId,
        address: address,
        orderDate: orderDate,
        orderDetails: {
          orderPlaced: {
            date: currentDate,
            time: currentDate,
          },
          orderShipped: {
            date: twoDaysAfter,
            time: twoDaysAfter,
          },
          orderOutforDelivery: {
            date: fourDaysAfter,
            time: fourDaysAfter,
          },
          orderDelivered: {
            date: fourDaysAfter,
            time: fourDaysAfter,
          },
        },
        orderInfo: orderInfo,
      };
    });

    dispatch(addOrders(orderItemsWithOrderId));
    dispatch(emptyCartafterOplaced());
    navigation.navigate('Dashboard Screen');
  };
  const {darkMode} = useTheme();

  const radioButtons = useMemo(
    () => [
      {
        id: '1',
        label: 'Credit card',
        value: 'creditcard',
        image: require('../../assets/logo/mastercardlogo.png'),
      },
      {
        id: '2',
        label: 'Paypal',
        value: 'paypal',
        image: require('../../assets/logo/paypallogo.png'),
      },
      {
        id: '3',
        label: 'Visa',
        value: 'visa',
        image: require('../../assets/logo/visalogo.png'),
      },
      {
        id: '4',
        label: 'Google pay',
        value: 'googlepay',
        image: require('../../assets/logo/gpaylogo.png'),
      },
      {
        id: '5',
        label: 'Cash on delivery',
        value: 'cod',
        image: require('../../assets/logo/cod.png'),
      },
    ],
    [],
  );
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const selectedOption = radioButtons.find(
    button => button.value === selectedId,
  );
  const handleNext = () => {
    navigation.navigate('PaymentFillDetail', {
      selectedOption: selectedOption,
      address: address,
    });
  };

  const handleCancel = () => {
    navigation.navigate('Cart Screen');
  };

  const handleAddCard = () => {
    navigation.navigate('AddNewCard');
  };

  const handleCodConfirm = () => {
    setModalVisible(true);
    setTimeout(() => {
      setTitle('Successful!');
      setDescription("Your order's placed! Thankyou.");
      setLoading(false);
    }, 3000);
  };

  return (
    <View
      style={[
        styles.maincontainer,
        {backgroundColor: darkMode ? 'black' : 'white'},
      ]}>
      <CustomModal
        visible={modalVisible}
        onClose={handleContinueShopping}
        title={title}
        description={description}
        LogoComponent={() => <Icon name="gpp-good" size={80} color="black" />}
        loading={loading}
      />
      {/* <StepProgress currentStep={3} /> */}
      <Text style={[styles.heading, {color: darkMode ? 'white' : 'black'}]}>
        Payment
      </Text>
      <RadioButtonGroup
        radioButtons={radioButtons}
        onPress={setSelectedId}
        selectedId={selectedId}
        LogoComponent={true}
        darkMode={darkMode}
      />
      <CustomButtonComponent
        text="Add Card"
        color="transparent"
        onSubmit={handleAddCard}
        textcolor={darkMode ? 'white' : 'black'}
        logo={'plus-square-o'}
        border="dashed"
      />
      <View style={styles.nextbtn}>
        <CustomButtonComponent
          text="Cancel"
          color={'transparent'}
          onSubmit={handleCancel}
          textcolor={darkMode ? 'white' : 'grey'}
          width="48%"
        />
        {selectedOption?.value == 'cod' ? (
          <CustomButtonComponent
            text="Confirm"
            color={darkMode ? 'white' : 'black'}
            onSubmit={handleCodConfirm}
            textcolor={darkMode ? 'black' : 'white'}
            width="48%"
          />
        ) : (
          <CustomButtonComponent
            text="Next"
            color={darkMode ? 'white' : 'black'}
            onSubmit={handleNext}
            textcolor={darkMode ? 'black' : 'white'}
            width="48%"
            disabled={selectedId ? false : true}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    // backgroundColor: '#fff',
    flex: 1,
    padding: 10,
    paddingHorizontal: 20,
  },

  nextbtn: {
    marginTop: 'auto',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  heading: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    // color: 'black',
  },
  radioGroupContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  radiobuttonContainer: {
    // position: 'absolute',
    // right: 0,
    // top: 20,
    justifyContent: 'space-between',
  },
  radioButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginLeft: 10,
  },
  radioButtonText: {
    // marginRight: 5,
    fontSize: 10,
  },
  radioButtonTextSelected: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 10,
  },
  radioButtonSelected: {
    borderColor: '#000',
    fontWeight: 'bold',
  },
  radioGroupLabels: {
    fontSize: 16,
  },
});

export default PaymentScreen;
