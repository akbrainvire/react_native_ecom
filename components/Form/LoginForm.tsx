import {View, Text, StyleSheet, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../theme/theme';
import CustomButtonComponent from '../generic/CustomButtonComponent';
import HorizontalLineWithText from '../generic/HorizontalLinewithText';
import {useDispatch, useSelector} from 'react-redux';
import {authorize} from '../../store/AuthenticSlice';
import {useNavigation} from '@react-navigation/native';

const LoginForm = () => {
  const navigation = useNavigation<any>();
  const [formInput, setFormInput] = useState<any>({
    email: '',
    password: '',
  });

  const state = useSelector((state: any) => state.autheticate);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.isAuthorized) {
      navigation.navigate('Dashboard');
    }
  }, [state.isAuthorized]);

  const [error, setError] = useState({
    email: '',
    password: '',
  });
  const [isFormValid, setisFormValid] = useState(false);

  const OnHandleChange = (value: any, tag: any) => {
    setFormInput((prev: any) => {
      return {
        ...prev,
        [tag]: value,
      };
    });
  };

  const checkForError = () => {
    const updatedErrors: any = {};

    for (const tag in formInput) {
      if (tag === 'email' && !isValidEmail(formInput[tag])) {
        if (formInput[tag] === '') {
          updatedErrors[tag] = 'Email is required';
        } else {
          updatedErrors[tag] = 'Invalid email format';
        }
      } else {
        if (formInput[tag] === '') {
          updatedErrors[tag] = 'This Field cannot be blank';
        } else {
          updatedErrors[tag] = '';
        }
      }
    }

    setError(prev => ({...prev, ...updatedErrors}));

    const isFormValid = Object.values(updatedErrors).every(val => val === '');
    setisFormValid(isFormValid);
  };

  const HandleErrorOnBlur = () => {
    checkForError();
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const HandleOAuth = (name: string) => {
    if (name == 'google') {
      console.log('google');
    } else if (name == 'facebook') {
      console.log('facebook');
    } else if (name == 'apple') {
      console.log('apple');
    }
  };

  const handleLogin = () => {
    checkForError();

    if (isFormValid) {
      dispatch(authorize(formInput));
      setFormInput({
        email: '',
        password: '',
      });
    }

    console.log(error);
  };

  return (
    <>
      <View style={styles.welcomeContainer}>
        <Text style={styles.headerStyle}>Welcome!</Text>
        <Text style={styles.headerDesStyle}>
          please login or sign up to continue our app
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={value => OnHandleChange(value, 'email')}
          onBlur={() => HandleErrorOnBlur()}
          placeholder="Enter Email"
          value={formInput.email}
        />
        {error.email !== '' && (
          <Text style={styles.errorText}>{error.email}</Text>
        )}

        <TextInput
          style={styles.textInput}
          onChangeText={value => OnHandleChange(value, 'password')}
          onBlur={() => HandleErrorOnBlur()}
          placeholder="Enter Password"
          value={formInput.password}
        />
        {error.password !== '' && (
          <Text style={styles.errorText}>{error.password}</Text>
        )}
      </View>

      <CustomButtonComponent
        text={'Login'}
        color={colors.elementBackground}
        onSubmit={handleLogin}
        textcolor={colors.white}
      />

      <HorizontalLineWithText text="OR" />

      <CustomButtonComponent
        text={'Continue with Facebook'}
        color={colors.blue}
        textcolor={colors.white}
        onSubmit={() => HandleOAuth('facebook')}
        logo="facebook-f"
      />
      <CustomButtonComponent
        text={'Continue with Google'}
        onSubmit={() => HandleOAuth('google')}
        color={colors.white}
        textcolor={colors.grey}
        logo="google"
      />
      <CustomButtonComponent
        text={'Continue with Apple'}
        color={colors.white}
        textcolor={colors.grey}
        onSubmit={() => HandleOAuth('apple')}
        logo="apple"
      />
    </>
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
    resizeMode: 'contain', // Add this line to make the image fit inside the container
    height: 100, // Ensure the image takes the full height of the container
    width: 200, // Ensure the image takes the full width of the container
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
    // paddingLeft: 10,
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
    color: 'black', // Customize the color as needed
  },
  checkbox: {
    alignSelf: 'center',
  },
});

export default LoginForm;
