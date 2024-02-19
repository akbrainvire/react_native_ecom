import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {colors} from '../../theme/theme';
import CustomKeyboardAvoidingView from '../generic/CustomKeyboardAvoidingView';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const Form = ({value}: {value: string}) => {
  return (
    <CustomKeyboardAvoidingView>
      <View style={styles.mainContainer}>
        <View style={styles.logomodelcontainer}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logoModel}
          />
        </View>
        <View>
          {value === 'login' ? (
            <LoginForm />
          ) : value === 'signup' ? (
            <SignupForm />
          ) : null}
        </View>
      </View>
    </CustomKeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 10,
  },
  welcomeContainer: {
    paddingVertical: 30,
  },

  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.brownshade,
    borderRadius: 10,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    marginVertical: 10,
  },
  inputContainer: {
    paddingBottom: 30,
  },

  logomodelcontainer: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
  },
  logoModel: {
    resizeMode: 'contain',
    height: 100,
    width: 200,
  },
  headerStyle: {
    fontSize: 26,
    fontWeight: '900',
    color: 'black',
  },
  headerDesStyle: {
    color: colors.lightbrown,
    fontSize: 18,
  },
  errorText: {
    color: 'red',
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  checkboxLabel: {
    marginLeft: 0,
    color: 'black',
  },
  checkbox: {
    alignSelf: 'center',
  },
});

export default Form;
