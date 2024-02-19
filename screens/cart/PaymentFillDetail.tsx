import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import CustomModal from '../../components/generic/CustomModal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomButtonComponent from '../../components/generic/CustomButtonComponent';
import PaymentFillForm from './PaymentFillForm';

const PaymentFillDetail = ({navigation, route}: any) => {
  console.log(route, 'route');
  const {selectedOption} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleContinueShopping = () => {
    setModalVisible(false);
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
    <View style={styles.container}>
      <PaymentFillForm paymentOption={selectedOption.value} />
      <CustomModal
        visible={modalVisible}
        onClose={handleContinueShopping}
        title={title}
        description={description}
        LogoComponent={() => <Icon name="gpp-good" size={80} color="black" />}
        loading={loading}
      />
      <View style={styles.nextbtn}>
        <CustomButtonComponent
          text="Cancel"
          color="transparent"
          onSubmit={handleCancel}
          textcolor="grey"
          width="48%"
        />
        <CustomButtonComponent
          text="Confirm"
          color="black"
          onSubmit={handleConfirm}
          textcolor="white"
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
    backgroundColor: '#fff',
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
