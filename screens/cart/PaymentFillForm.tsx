import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Image} from 'react-native-elements';

const CardForm = ({name, logo, darkMode}: any) => {
  return (
    <View style={styles.formContainer}>
      <View style={styles.logocontainer}>
        <Image source={logo} style={styles.logoImage} />
      </View>
      <Text>{name}</Text>
      <TextInput
        style={[styles.input, {color: darkMode ? 'white' : 'black'}]}
        placeholder="Card Number"
        placeholderTextColor={darkMode ? 'white' : 'grey'}
      />
      <TextInput
        style={[styles.input, {color: darkMode ? 'white' : 'black'}]}
        placeholder="Expiry Date"
        placeholderTextColor={darkMode ? 'white' : 'grey'}
      />
      <TextInput
        style={[styles.input, {color: darkMode ? 'white' : 'black'}]}
        placeholder="CVV"
        placeholderTextColor={darkMode ? 'white' : 'grey'}
      />
    </View>
  );
};

const GooglePayForm = ({darkMode}: any) => {
  return (
    <View style={styles.formContainer}>
      <View style={styles.logocontainer}>
        <Image
          source={require('../../assets/logo/gpaylogo.png')}
          style={styles.logoImage}
        />
      </View>
      <TextInput
        style={[styles.input, {color: darkMode ? 'white' : 'black'}]}
        placeholder="UPI ID"
        placeholderTextColor={darkMode ? 'white' : 'grey'}
      />
    </View>
  );
};
const PaymentFillForm = ({
  paymentOption,
  darkMode,
}: {
  paymentOption: string;
  darkMode: boolean;
}) => {
  return (
    <View style={styles.container}>
      {paymentOption === 'creditcard' && (
        <CardForm
          name="Credit Card"
          logo={require('../../assets/logo/mastercardlogo.png')}
          darkMode={darkMode}
        />
      )}
      {paymentOption === 'paypal' && (
        <CardForm
          name="Paypal"
          logo={require('../../assets/logo/paypallogo.png')}
          darkMode={darkMode}
        />
      )}
      {paymentOption === 'visa' && (
        <CardForm
          name="Visa"
          logo={require('../../assets/logo/visalogo.png')}
          darkMode={darkMode}
        />
      )}
      {paymentOption === 'googlepay' && <GooglePayForm darkMode={darkMode} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  formContainer: {
    // alignItems: 'center',
    width: '100%',
  },
  logocontainer: {
    marginTop: 10,
    width: 'auto',
    height: 100,
  },
  logoImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    minWidth: 300,
    width: '100%',
  },
});

export default PaymentFillForm;
