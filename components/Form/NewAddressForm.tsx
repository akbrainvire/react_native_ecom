import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addAddressForUser} from '../../store/AuthenticSlice';
import CustomKeyboardAvoidingView from '../generic/CustomKeyboardAvoidingView';
import {useTheme} from '../../context/ThemeContext';
import CustomDropdown from '../generic/CustomDropDown';
import {Country, State, City} from 'country-state-city';
import HorizontalLineWithText from '../generic/HorizontalLinewithText';
import CustomActivityIndicator from '../generic/CustomActivityIndicator';
import {useToast} from 'react-native-toast-notifications';
import axios from 'axios';
import {updateOrders} from '../../store/OrderSlice';

const NewAddressForm = ({navigation, route}: any) => {
  const {addressDetails2} = route?.params;
  const [loading, setLoading] = useState(false);

  const {darkMode, colors} = useTheme();
  const dispatch = useDispatch();
  const [countries, setCountries] = useState<any>([]);
  const [states, setStates] = useState<any>([]);
  const toast = useToast();
  const isChange = route.params?.isChange || false;
  const orderId = route.params?.orderId || 0;
  const [cities, setCities] = useState<any>([]);

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  const handleGetAddress = async (lat: any, long: any) => {
    setLoading(true);
    try {
      console.log(lat, long, 'console');
      const response = await axios.get(
        `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat}%2C${long}&limit=20&apiKey=XmVTCjy44QbboBMWdJJRZnhcahJHn321dGDO6yXlrQs`,
      );
      // const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyCkn15ZlylnK59_OoCExGHymWpozd6OcYg')
      console.log(response.data.items, 'response');
    } catch (error: any) {
      toast.show(error.message, {
        duration: 2000,
        swipeEnabled: true,
        style: {backgroundColor: 'black'},
        textStyle: {color: 'white'},
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (addressDetails2.latitude !== null) {
      handleGetAddress(addressDetails2.latitude, addressDetails2.longitude);
    }
  }, [addressDetails2?.latitude]);

  const [addressDetails, setAddressDetails] = useState({
    fullName: '',
    phoneNumber: '',
    pincode: '',
    country: {
      name: '',
      latitude: null,
      longitude: null,
    },
    state: {
      name: '',
    },
    city: {
      name: '',
      latitude: null,
      longitude: null,
    },
    houseNo: '',
    area: '',
    type: 'home',
  });

  // fullName: 'John Doe',
  // phoneNumber: '1234567890',
  // pincode: '12345',
  // country: {
  //   currency: 'USD',
  //   flag: '🇺🇸',
  //   isoCode: 'US',
  //   latitude: 38.0,
  //   longitude: -97.0,
  //   name: 'United States',
  //   phonecode: '1',
  // },
  // state: {name: 'California'},
  // city: {name: 'Los Angeles', latitude: 34.0549, longitude: -118.2426},
  // houseNo: '123',
  // area: 'Downtown',
  // type: 'Home',
  // id: 1,

  const [errors, setErrors] = useState({
    fullName: '',
    phoneNumber: '',
    pincode: '',
    country: '',
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

  console.log(addressDetails, 'addresddreta');

  const handleSubmit = () => {
    const validationErrors: any = {
      fullName: '',
      phoneNumber: '',
      pincode: '',
      country: '',
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
    if (!addressDetails.country.name.trim()) {
      validationErrors.country = 'Country is required';
    }
    if (!addressDetails.state.name.trim()) {
      validationErrors.state = 'State is required';
    }
    if (!addressDetails.city.name.trim()) {
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
          id: `${addressDetails.city.name}-${addressDetails.houseNo}-${addressDetails.area}`,
        }),
      );
      navigation.navigate('AddressScreen');
      // Reset form
      setAddressDetails({
        fullName: '',
        phoneNumber: '',
        pincode: '',
        country: {
          name: '',
        },
        state: {
          name: '',
        },
        city: {
          name: '',
        },
        houseNo: '',
        area: '',
        type: 'home',
      });
      setErrors({
        fullName: '',
        phoneNumber: '',
        pincode: '',
        country: '',
        state: '',
        city: '',
        houseNo: '',
        area: '',
      });
    } else {
      setErrors(validationErrors);
    }
  };

  const handleCountrySelect = (option: any) => {
    setStates(
      State.getStatesOfCountry(option.isoCode).map((state: any) => {
        return {...state, countryCode: option.isoCode};
      }),
    );
    setAddressDetails(prev => {
      return {
        ...prev,
        country: {...option},
        state: {
          name: '',
        },
      };
    });
  };

  const handleStateSelect = (option: any) => {
    setAddressDetails(prev => {
      return {
        ...prev,
        state: {...option},
        city: {
          name: '',
        },
      };
    });
    setCities(City.getCitiesOfState(option.countryCode, option.isoCode));
  };

  const handleCitySelect = (option: any) => {
    setAddressDetails(prev => {
      return {
        ...prev,
        city: {...option},
      };
    });
  };

  const handleSelectOnMap = () => {
    navigation.navigate('AddAddressMap');
  };

  const orders = useSelector((state: any) => state.orders.orders);

  const handleChangePickup = () => {
    const dataTochange = {
      ...addressDetails,
    };

    const validationErrors: any = {
      fullName: '',
      phoneNumber: '',
      pincode: '',
      country: '',
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
    if (!addressDetails.country.name.trim()) {
      validationErrors.country = 'Country is required';
    }
    if (!addressDetails.state.name.trim()) {
      validationErrors.state = 'State is required';
    }
    if (!addressDetails.city.name.trim()) {
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

    const orderInfo = {
      orderOutforDeliveryCity: addressDetails.city.name,
      orderDeliveredCity: addressDetails.city.name,

      orderDeliveredLocation: {
        latitude: addressDetails.city?.latitude,
        longitude: addressDetails.city?.longitude,
      },
    };

    if (checkValidation()) {
      const findIndex = orders.findIndex(
        (
          order: any, //console.log(order.id === orderId, 'orderIDDD'),
        ) => order.id === orderId,
      );
      const orderInfoPrev = orders[findIndex].orderInfo;
      const orderInfoToSend = {...orderInfoPrev, ...orderInfo};
      console.log(orderInfoToSend, 'infotosend');
      const dataTosend = {
        ...orders[findIndex],
        address: dataTochange,
        orderInfo: {
          ...orderInfoPrev,
          ...orderInfo,
        },
        id: orderId,
      };
      dispatch(updateOrders(dataTosend));

      console.log(orders, 'ordersssssssss');
      toast.show('Updated successfully', {});
      navigation.navigate('My Orders');
    }
  };
  return (
    <CustomKeyboardAvoidingView>
      <ScrollView contentContainerStyle={{flex: 1}}>
        {loading ? (
          <CustomActivityIndicator />
        ) : (
          <View
            style={{
              flex: 1,
              backgroundColor: darkMode ? colors.black : colors.white,
              paddingHorizontal: 20,
              paddingTop: 20,
            }}>
            <View style={[styles.container]}>
              <View style={styles.row}>
                <View style={styles.half}>
                  <TextInput
                    style={[
                      styles.input,
                      {color: darkMode ? colors.white : colors.black},
                    ]}
                    placeholder="Full Name"
                    value={addressDetails.fullName}
                    onChangeText={text => handleChange('fullName', text)}
                    placeholderTextColor={darkMode ? '#dedede' : colors.grey}
                  />
                  {errors.fullName && (
                    <Text style={styles.error}>{errors.fullName}</Text>
                  )}
                </View>
                <View style={styles.half}>
                  <TextInput
                    style={[
                      styles.input,
                      {color: darkMode ? colors.white : colors.black},
                    ]}
                    placeholder="Phone Number"
                    value={addressDetails.phoneNumber}
                    onChangeText={text => handleChange('phoneNumber', text)}
                    keyboardType="phone-pad"
                    placeholderTextColor={darkMode ? '#dedede' : colors.grey}
                  />
                  {errors.phoneNumber && (
                    <Text style={styles.error}>{errors.phoneNumber}</Text>
                  )}
                </View>
              </View>
              <View style={[{marginBottom: 20, backgroundColor: colors.black}]}>
                {/* <TextInput
            style={[{color: darkMode ?colors.white : 'black'}]}
            placeholder="Country"
            value={addressDetails.country}
            onChangeText={text => handleChange('country', text)}
            placeholderTextColor={darkMode ? '#dedede' : 'grey'}
          /> */}
                <CustomDropdown
                  placeholder={'Country'}
                  options={countries}
                  onSelect={(option: any) => handleCountrySelect(option)}
                  disabled={false}
                  value={addressDetails.country.name}
                />
                {errors.country && (
                  <Text style={styles.error}>{errors.country}</Text>
                )}
              </View>
              <View style={styles.row}>
                <View style={styles.half}>
                  {/* <TextInput
            style={[styles.input, {color: darkMode ? 'white' : 'black'}]}
            placeholder="State"
            value={addressDetails.state}
            onChangeText={text => handleChange('state', text)}
            placeholderTextColor={darkMode ? '#dedede' : 'grey'}
          />*/}

                  <CustomDropdown
                    placeholder={'State'}
                    options={states}
                    onSelect={(option: any) => handleStateSelect(option)}
                    disabled={addressDetails.country.name == ''}
                    value={addressDetails.state.name}
                  />
                  {errors.state && (
                    <Text style={styles.error}>{errors.state}</Text>
                  )}
                </View>
                <View style={styles.half}>
                  {/* <TextInput
            style={[styles.input, {color: darkMode ? 'white' : 'black'}]}
            placeholder="City"
            value={addressDetails.city}
            onChangeText={text => handleChange('city', text)}
            placeholderTextColor={darkMode ? '#dedede' : 'grey'}
          /> */}
                  <CustomDropdown
                    placeholder={'City'}
                    options={cities}
                    onSelect={(option: any) => handleCitySelect(option)}
                    disabled={addressDetails.state.name == ''}
                    value={addressDetails.city.name}
                  />
                  {errors.city && (
                    <Text style={styles.error}>{errors.city}</Text>
                  )}
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.half}>
                  <TextInput
                    style={[
                      styles.input,
                      {color: darkMode ? colors.white : colors.black},
                    ]}
                    placeholder="House No."
                    value={addressDetails.houseNo}
                    onChangeText={text => handleChange('houseNo', text)}
                    placeholderTextColor={darkMode ? '#dedede' : colors.grey}
                  />
                  {errors.houseNo && (
                    <Text style={styles.error}>{errors.houseNo}</Text>
                  )}
                </View>
                <View style={styles.half}>
                  <TextInput
                    style={[
                      styles.input,
                      {color: darkMode ? colors.white : colors.black},
                    ]}
                    placeholder="Pincode"
                    value={addressDetails.pincode}
                    onChangeText={text => handleChange('pincode', text)}
                    placeholderTextColor={darkMode ? '#dedede' : colors.grey}
                  />
                  {errors.pincode && (
                    <Text style={styles.error}>{errors.pincode}</Text>
                  )}
                </View>
              </View>
              <TextInput
                style={[
                  styles.inputArea,
                  {color: darkMode ? colors.white : colors.black},
                ]}
                placeholder="Area"
                value={addressDetails.area}
                multiline={true}
                // maxLength={200}
                onChangeText={text => handleChange('area', text)}
                placeholderTextColor={darkMode ? '#dedede' : colors.grey}
              />
              {errors.area && <Text style={styles.error}>{errors.area}</Text>}
            </View>
            <View style={{flex: 1}}>
              {isChange ? (
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: darkMode ? colors.white : colors.black,
                      marginTop: 'auto',
                    },
                  ]}
                  onPress={handleChangePickup}>
                  <Text
                    style={[
                      styles.buttonText,
                      {color: darkMode ? colors.black : colors.white},
                    ]}>
                    Change pick up
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: darkMode ? colors.white : colors.black,
                      marginTop: 'auto',
                    },
                  ]}
                  onPress={handleSubmit}>
                  <Text
                    style={[
                      styles.buttonText,
                      {color: darkMode ? colors.black : colors.white},
                    ]}>
                    Save Address
                  </Text>
                </TouchableOpacity>
              )}
              <HorizontalLineWithText text="Or" />
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: darkMode ? colors.black : colors.white,
                    marginBottom: 20,
                    borderColor: colors.grey,
                    borderWidth: 2,
                  },
                ]}
                onPress={handleSelectOnMap}>
                <Text
                  style={[
                    styles.buttonText,
                    {color: darkMode ? colors.white : colors.black},
                  ]}>
                  Select from Map
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </CustomKeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  half: {
    width: '50%',
    // flex: 1
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
    // marginTop: 'auto',
    // backgroundColor: 'black',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
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
