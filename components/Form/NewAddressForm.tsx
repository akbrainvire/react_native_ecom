import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';

const NewAddressForm = () => {
  const dispatch = useDispatch();

  const [addressDetails, setAddressDetails] = useState({
    fullName: '',
    phoneNumber: '',
    pincode: '',
    state: '',
    city: '',
    houseNo: '',
    area: '',
    type: 'home', // Default type is home
  });

  const [errors, setErrors] = useState({});

  const handleChange = (key: any, value: any) => {
    setAddressDetails({
      ...addressDetails,
      [key]: value,
    });
  };

  const handleSubmit = () => {
    // Basic validation
    const validationErrors = {};
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

    if (Object.keys(validationErrors).length === 0) {
      dispatch(authorize(addressDetails));
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
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={addressDetails.fullName}
        onChangeText={text => handleChange('fullName', text)}
      />
      {errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}

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

      <TextInput
        style={styles.input}
        placeholder="Pincode"
        value={addressDetails.pincode}
        onChangeText={text => handleChange('pincode', text)}
        keyboardType="numeric"
      />
      {errors.pincode && <Text style={styles.error}>{errors.pincode}</Text>}

      <TextInput
        style={styles.input}
        placeholder="State"
        value={addressDetails.state}
        onChangeText={text => handleChange('state', text)}
      />
      {errors.state && <Text style={styles.error}>{errors.state}</Text>}

      <TextInput
        style={styles.input}
        placeholder="City"
        value={addressDetails.city}
        onChangeText={text => handleChange('city', text)}
      />
      {errors.city && <Text style={styles.error}>{errors.city}</Text>}

      <TextInput
        style={styles.input}
        placeholder="House No."
        value={addressDetails.houseNo}
        onChangeText={text => handleChange('houseNo', text)}
      />
      {errors.houseNo && <Text style={styles.error}>{errors.houseNo}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Area"
        value={addressDetails.area}
        onChangeText={text => handleChange('area', text)}
      />
      {errors.area && <Text style={styles.error}>{errors.area}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save Address</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
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
