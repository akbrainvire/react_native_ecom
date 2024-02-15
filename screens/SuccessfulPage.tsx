import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import CustomButtonComponent from '../components/generic/CustomButtonComponent';

const SuccessfulPage = ({navigation}: any) => {
  const startShopping = () => {
    // Navigate to the dashboard screen
    console.log('neter');
    navigation.navigate('Dashboard'); // Replace 'Dashboard' with the name of your dashboard screen
  };

  return (
    <View style={styles.container}>
      <Icon name="check-circle" size={100} color="green" />
      <Text style={styles.title}>Successful!</Text>
      <Text style={styles.description}>
        You have successfully registered in our app and can start working in it.
      </Text>
      <CustomButtonComponent
        text="Start Shopping"
        textcolor="white"
        color="#260C1A"
        onSubmit={startShopping}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'green', // Adjust the color as needed
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SuccessfulPage;
