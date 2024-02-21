import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
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
  const [error, setError] = useState({
    username: '',
    password: '',
    general: '', // General error message for invalid credentials
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setError(prevError => ({...prevError, general: ''}));
  }, [formInput.username, formInput.password]);

  const checkForError = () => {
    const updatedErrors: any = {};

    for (const tag in formInput) {
      if (formInput[tag] === '') {
        updatedErrors[tag] =
          tag === 'username' ? 'Username is required' : 'Password is required';
      } else {
        updatedErrors[tag] = '';
      }
    }

    setError(prev => ({...prev, ...updatedErrors}));

    const isFormValid = Object.values(updatedErrors).every(val => val === '');
    setIsFormValid(isFormValid);
  };

  const handleLogin = async () => {
    checkForError();
    if (!isFormValid) return;

    setLoading(true);
    try {
      const username = formInput.username;
      const password = formInput.password;
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
      });
      const data = await response.json();

      if (data.message) {
        setError(prev => ({...prev, general: data.message}));
      } else {
        const pushData = {...data, savedAddresses: []};
        dispatch(authorize(pushData));
        navigation.navigate('Dashboard Screen');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError(prev => ({
        ...prev,
        general: 'An error occurred. Please try again later.',
      }));
    } finally {
      setLoading(false);
    }
  };
  const HandleOAuth = (s: string) => {
    console.log(s);
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
              onChangeText={value => {
                setFormInput((prev: any) => ({...prev, username: value}));
                checkForError();
              }}
              // onBlur={checkForError}
              placeholder="Enter username"
              value={formInput.username}
            />
            {error.username !== '' && (
              <Text style={styles.errorText}>{error.username}</Text>
            )}

            <TextInput
              style={styles.textInput}
              onChangeText={value =>
                setFormInput((prev: any) => ({...prev, password: value}))
              }
              onBlur={checkForError}
              placeholder="Enter Password"
              value={formInput.password}
            />
            {error.password !== '' && (
              <Text style={styles.errorText}>{error.password}</Text>
            )}
            {error.general !== '' && (
              <Text style={styles.errorText}>{error.general}</Text>
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

export default LoginForm;
