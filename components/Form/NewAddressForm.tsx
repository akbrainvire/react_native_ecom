import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addAddressForUser} from '../../store/AuthenticSlice';
import CustomKeyboardAvoidingView from '../generic/CustomKeyboardAvoidingView';
import {useTheme} from '../../context/ThemeContext';

const NewAddressForm = ({navigation}: any) => {
  const {darkMode} = useTheme();
  const dispatch = useDispatch();

  const [addressDetails, setAddressDetails] = useState({
    fullName: '',
    phoneNumber: '',
    pincode: '',
    state: '',
    city: '',
    houseNo: '',
    area: '',
    type: 'home',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    phoneNumber: '',
    pincode: '',
    state: '',
    city: '',
    houseNo: '',
    area: '',
  });

  const handleChange = (key: any, value: any) => {
    setAddressDetails({
      ...addressDetails,
      [key]: value,
    });
  };

  const handleSubmit = () => {
    const validationErrors: any = {
      fullName: '',
      phoneNumber: '',
      pincode: '',
      state: '',
      city: '',
      houseNo: '',
      area: '',
    };
    if (!addressDetails.fullName.trim()) {
      validationErrors.fullName = 'Full name is required';
    }
    if (!addressDetails.phoneNumber.trim()) {
      validationErrors.phoneNumber = 'Phone number is required';
    }
    if (!addressDetails.pincode.trim()) {
      validationErrors.pincode = 'Pincode is required';
    }
    if (!addressDetails.state.trim()) {
      validationErrors.state = 'State is required';
    }
    if (!addressDetails.city.trim()) {
      validationErrors.city = 'City is required';
    }
    if (!addressDetails.houseNo.trim()) {
      validationErrors.houseNo = 'House number is required';
    }
    if (!addressDetails.area.trim()) {
      validationErrors.area = 'Area is required';
    }

    function checkValidation() {
      let flag = true;
      for (let key in validationErrors) {
        if (validationErrors[key] !== '') {
          console.log(validationErrors[key]);
          flag = false;
          break;
        }
      }

      console.log(flag);

      return flag;
    }

    if (checkValidation()) {
      dispatch(
        addAddressForUser({
          ...addressDetails,
          id: `${addressDetails.city}-${addressDetails.houseNo}-${addressDetails.area}`,
        }),
      );
      console.log('enter');
      navigation.navigate('AddressScreen');
      // Reset form
      setAddressDetails({
        fullName: '',
        phoneNumber: '',
        pincode: '',
        state: '',
        city: '',
        houseNo: '',
        area: '',
        type: 'home',
      });
      setErrors({
        fullName: '',
        phoneNumber: '',
        pincode: '',
        state: '',
        city: '',
        houseNo: '',
        area: '',
      });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <CustomKeyboardAvoidingView>
      <View
        style={[
          styles.container,
          {backgroundColor: darkMode ? 'black' : 'white'},
        ]}>
        <View style={styles.row}>
          <View style={styles.half}>
            <TextInput
              style={[styles.input, {color: darkMode ? 'white' : 'black'}]}
              placeholder="Full Name"
              value={addressDetails.fullName}
              onChangeText={text => handleChange('fullName', text)}
              placeholderTextColor={darkMode ? '#dedede' : 'grey'}
            />
            {errors.fullName && (
              <Text style={styles.error}>{errors.fullName}</Text>
            )}
          </View>
          <View style={styles.half}>
            <TextInput
              style={[styles.input, {color: darkMode ? 'white' : 'black'}]}
              placeholder="Phone Number"
              value={addressDetails.phoneNumber}
              onChangeText={text => handleChange('phoneNumber', text)}
              keyboardType="phone-pad"
              placeholderTextColor={darkMode ? '#dedede' : 'grey'}
            />
            {errors.phoneNumber && (
              <Text style={styles.error}>{errors.phoneNumber}</Text>
            )}
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.half}>
            <TextInput
              style={[styles.input, {color: darkMode ? 'white' : 'black'}]}
              placeholder="State"
              value={addressDetails.state}
              onChangeText={text => handleChange('state', text)}
              placeholderTextColor={darkMode ? '#dedede' : 'grey'}
            />
            {errors.state && <Text style={styles.error}>{errors.state}</Text>}
          </View>
          <View style={styles.half}>
            <TextInput
              style={[styles.input, {color: darkMode ? 'white' : 'black'}]}
              placeholder="City"
              value={addressDetails.city}
              onChangeText={text => handleChange('city', text)}
              placeholderTextColor={darkMode ? '#dedede' : 'grey'}
            />
            {errors.city && <Text style={styles.error}>{errors.city}</Text>}
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.half}>
            <TextInput
              style={[styles.input, {color: darkMode ? 'white' : 'black'}]}
              placeholder="House No."
              value={addressDetails.houseNo}
              onChangeText={text => handleChange('houseNo', text)}
              placeholderTextColor={darkMode ? '#dedede' : 'grey'}
            />
            {errors.houseNo && (
              <Text style={styles.error}>{errors.houseNo}</Text>
            )}
          </View>
          <View style={styles.half}>
            <TextInput
              style={[styles.input, {color: darkMode ? 'white' : 'black'}]}
              placeholder="Pincode"
              value={addressDetails.pincode}
              onChangeText={text => handleChange('pincode', text)}
              placeholderTextColor={darkMode ? '#dedede' : 'grey'}
            />
            {errors.pincode && (
              <Text style={styles.error}>{errors.pincode}</Text>
            )}
          </View>
        </View>
        <TextInput
          style={[styles.inputArea, {color: darkMode ? 'white' : 'black'}]}
          placeholder="Area"
          value={addressDetails.area}
          multiline={true}
          // maxLength={200}
          onChangeText={text => handleChange('area', text)}
          placeholderTextColor={darkMode ? '#dedede' : 'grey'}
        />
        {errors.area && <Text style={styles.error}>{errors.area}</Text>}
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: darkMode ? 'white' : 'black'},
          ]}
          onPress={handleSubmit}>
          <Text
            style={[styles.buttonText, {color: darkMode ? 'black' : 'white'}]}>
            Save Address
          </Text>
        </TouchableOpacity>
      </View>
    </CustomKeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    // backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  half: {
    flex: 1,
    marginRight: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputArea: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    marginTop: 'auto',
    // backgroundColor: 'black',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    // color: 'white',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default NewAddressForm;
