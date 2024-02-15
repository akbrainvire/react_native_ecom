// SignupScreen.js
import React from 'react';
import {View} from 'react-native';
import Form from '../components/Form/Form';

const SignupScreen = ({route}: any) => {
  const {id} = route.params;
  return <Form value={id} />;
};

export default SignupScreen;
