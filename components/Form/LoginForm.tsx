import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
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
    username: '',
    password: '',
  });

  const state = useSelector((state: any) => state.autheticate);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [invalidcred, setinvalidcred] = useState<any>('');

  // useEffect(() => {
  //   if (state.isAuthorized) {
  //     navigation.navigate('Dashboard');
  //   }
  // }, [state.isAuthorized]);

  const [error, setError] = useState({
    username: '',
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
      if (tag === 'username') {
        if (formInput[tag] === '') {
          updatedErrors[tag] = 'Username is required';
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

  // const isValidEmail = (email: string) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  const HandleOAuth = (name: string) => {
    if (name == 'google') {
      console.log('google');
    } else if (name == 'facebook') {
      console.log('facebook');
    } else if (name == 'apple') {
      console.log('apple');
    }
  };

  const handleLogin = async () => {
    checkForError();
    setLoading(true);
    try {
      const username = formInput.username;
      const password = formInput.password;
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();

      if (data.message) {
        setinvalidcred(data.message);
      } else {
        const pushData = {...data, savedAddresses: []};
        dispatch(authorize(pushData));
        navigation.navigate('Dashboard Screen');
      }
      // return data;
    } catch (error) {
      console.error('Login failed:', error);
      setinvalidcred(error);
      throw new Error('Login failed');
    } finally {
      setLoading(false);
    }

    // if (isFormValid) {
    //   dispatch(authorize(formInput));
    //   setFormInput({
    //     email: '',
    //     password: '',
    //   });
    // }

    // console.log(error);
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" color="#000000" />
      ) : (
        <>
          <Text style={{fontSize: 20, color: 'black'}}>
            To login please write username{' '}
            <Text style={{fontWeight: 'bold'}}>kminchelle</Text> and password{' '}
            <Text style={{fontWeight: 'bold'}}>0lelplR</Text>
          </Text>

          <View style={styles.welcomeContainer}>
            <Text style={styles.headerStyle}>Welcome!</Text>
            <Text style={styles.headerDesStyle}>
              please login or sign up to continue our app
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={value => OnHandleChange(value, 'username')}
              onBlur={() => HandleErrorOnBlur()}
              placeholder="Enter username"
              value={formInput.username}
            />
            {error.username !== '' && (
              <Text style={styles.errorText}>{error.username}</Text>
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
      )}
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
