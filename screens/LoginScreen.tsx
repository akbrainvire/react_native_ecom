// LoginScreen.js
import React from 'react';
import {View, Text} from 'react-native';
import Form from '../components/Form/Form';

const LoginScreen = ({route}: any) => {
  const {id} = route.params;
  return (
    // <View>
    <Form value={id} />
    // </View>
  );
};

export default LoginScreen;
