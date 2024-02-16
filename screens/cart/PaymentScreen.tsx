import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import StepProgress from '../../components/cart/StepProgress';
import {TouchableOpacity} from 'react-native';
import CustomButtonComponent from '../../components/generic/CustomButtonComponent';

const PaymentScreen = () => {
  const navigation = useNavigation<any>();

  const handleNext = () => {
    navigation.navigate('OrderConfirmed');
  };

  const handleCancel = () => {
    navigation.navigate('Cart Screen');
  };

  return (
    <View style={styles.maincontainer}>
      {/* <StepProgress currentStep={3} /> */}
      <Text>Payment Screen</Text>
      <View style={styles.nextbtn}>
        <CustomButtonComponent
          text="Cancel"
          color="transparent"
          onSubmit={handleCancel}
          textcolor="grey"
          width="48%"
        />
        <CustomButtonComponent
          text="Confirm Payment"
          color="black"
          onSubmit={handleNext}
          textcolor="white"
          width="48%"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 10,
  },
  nextbtn: {
    marginTop: 'auto',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});

export default PaymentScreen;
