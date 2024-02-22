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
import {CheckBox} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {authorize} from '../../store/AuthenticSlice';
import CustomModal from '../generic/CustomModal';
import Icon from 'react-native-vector-icons/AntDesign';

const SignupForm = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.autheticate);

  const navigation = useNavigation<any>();
  const [formInput, setFormInput] = useState<any>({
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
  });
  const [isFormValid, setisFormValid] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (state.isAuthorized) {
      console.log('enter');
      navigation.navigate('SuccessfulPage');
    }
  }, [state.isAuthorized, navigation]);

  const [error, setError] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

  const [agreeTerms, setAgreeTerms] = useState(false);

  const onToggleTerms = () => {
    setAgreeTerms(!agreeTerms);
    console.log(agreeTerms);
  };
  const OnHandleChange = (value: any, tag: any) => {
    setFormInput((prev: any) => {
      return {
        ...prev,
        [tag]: value,
      };
    });

    // checkForError();
  };
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkForError = () => {
    const updatedErrors: any = {};

    for (const tag in formInput) {
      if (tag === 'email') {
        if (!isValidEmail(formInput[tag])) {
          if (formInput[tag] === '') {
            updatedErrors[tag] = 'Email is required';
          } else {
            updatedErrors[tag] = 'Invalid email format';
          }
        } else {
          updatedErrors[tag] = '';
        }
      } else if (tag === 'confirmpassword') {
        console.log(formInput[tag] !== formInput['password']);
        if (formInput[tag] !== formInput['password']) {
          updatedErrors[tag] = 'Password must match';
        } else {
          updatedErrors[tag] = '';
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

  const handleSignup = async () => {
    checkForError();
    setLoading(true);
    if (isFormValid && agreeTerms) {
      try {
        const response = await fetch('https://dummyjson.com/users/add', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            username: formInput.name,
            name: formInput.name,
            email: formInput.email,
            password: formInput.password,
            age: 25,
          }),
        });
        const userData = await response.json();

        console.log(userData, 'userdata');

        if (userData.id) {
          const data = {
            ...userData,
            savedAddresses: [],
            image: require('../../assets/logo/icon-5359553_640.png'),
          };
          dispatch(authorize(data));
          // navigation.navigate('SuccessfulPage');
        } else {
          console.error('Signup failed: Token not received');
        }
      } catch (error) {
        console.error('Signup failed:', error);
        navigation.navigate('Error Screen');
      } finally {
        setLoading(false);
      }
    }

    // if (isFormValid) {
    //   dispatch(authorize(formInput));
    // }
  };

  //   console.log(error);

  const [showPassword, setShowPassword] = useState(false);
  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#000000" />
      ) : (
        <View>
          <View style={styles.welcomeContainer}>
            <Text style={styles.headerStyle}>Sign Up</Text>
            <Text style={styles.headerDesStyle}>Create a new account</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={value => {
                OnHandleChange(value, 'name');
                checkForError();
              }}
              onBlur={() => HandleErrorOnBlur()}
              placeholder="Enter Name"
              value={formInput.name}
            />
            {error.name !== '' && (
              <Text style={styles.errorText}>{error.name}</Text>
            )}

            <TextInput
              style={styles.textInput}
              onChangeText={value => {
                OnHandleChange(value, 'email');
                checkForError();
              }}
              onBlur={() => HandleErrorOnBlur()}
              placeholder="Enter Email"
              value={formInput.email}
            />
            {error.email !== '' && (
              <Text style={styles.errorText}>{error.email}</Text>
            )}

            <TextInput
              style={styles.textInput}
              onChangeText={value => {
                OnHandleChange(value, 'password');
                checkForError();
              }}
              onBlur={() => HandleErrorOnBlur()}
              placeholder="Enter Password"
              value={formInput.password}
            />
            {error.password !== '' && (
              <Text style={styles.errorText}>{error.password}</Text>
            )}

            <TextInput
              style={styles.textInput}
              onChangeText={value => {
                OnHandleChange(value, 'confirmpassword');
                checkForError();
              }}
              onBlur={() => HandleErrorOnBlur()}
              placeholder="Confirm Password"
              value={formInput.confirmpassword}
            />
            {error.confirmpassword !== '' && (
              <Text style={styles.errorText}>{error.confirmpassword}</Text>
            )}
          </View>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="By creating an account you agree to our Terms & Conditions"
              checked={agreeTerms}
              onPress={() => setAgreeTerms(!agreeTerms)}
              containerStyle={styles.checkboxContainer}
              textStyle={styles.checkboxLabel}
            />
          </View>

          <CustomButtonComponent
            text={'Sign Up'}
            color={colors.elementBackground}
            onSubmit={handleSignup}
            textcolor={colors.white}
          />
        </View>
      )}
    </View>
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

export default SignupForm;
