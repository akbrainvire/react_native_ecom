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

const NewAddressForm = ({navigation}: any) => {
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

    let flag = true;

    for (let key in validationErrors) {
      if (validationErrors[key] !== '') {
        flag = false;
        break;
      }
    }

    if (flag) {
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
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.half}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={addressDetails.fullName}
              onChangeText={text => handleChange('fullName', text)}
            />
            {errors.fullName && (
              <Text style={styles.error}>{errors.fullName}</Text>
            )}
          </View>
          <View style={styles.half}>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={addressDetails.phoneNumber}
              onChangeText={text => handleChange('phoneNumber', text)}
              keyboardType="phone-pad"
            />
            {errors.phoneNumber && (
              <Text style={styles.error}>{errors.phoneNumber}</Text>
            )}
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.half}>
            <TextInput
              style={styles.input}
              placeholder="State"
              value={addressDetails.state}
              onChangeText={text => handleChange('state', text)}
            />
            {errors.state && <Text style={styles.error}>{errors.state}</Text>}
          </View>
          <View style={styles.half}>
            <TextInput
              style={styles.input}
              placeholder="City"
              value={addressDetails.city}
              onChangeText={text => handleChange('city', text)}
            />
            {errors.city && <Text style={styles.error}>{errors.city}</Text>}
          </View>
        </View>
        <TextInput
          style={styles.input}
          placeholder="House No."
          value={addressDetails.houseNo}
          onChangeText={text => handleChange('houseNo', text)}
        />
        {errors.houseNo && <Text style={styles.error}>{errors.houseNo}</Text>}
        <TextInput
          style={styles.inputArea}
          placeholder="Area"
          value={addressDetails.area}
          multiline={true}
          // maxLength={200}
          onChangeText={text => handleChange('area', text)}
        />
        {errors.area && <Text style={styles.error}>{errors.area}</Text>}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save Address</Text>
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
    backgroundColor: '#fff',
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
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default NewAddressForm;
