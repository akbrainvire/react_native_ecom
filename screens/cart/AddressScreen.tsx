import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import StepProgress from '../../components/cart/StepProgress';
import {useNavigation} from '@react-navigation/native';
import CustomButtonComponent from '../../components/generic/CustomButtonComponent';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from '../../context/ThemeContext';

const CustomRadioButton = ({selected, onPress, darkMode, children}: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.radioButton, selected && styles.radioButtonSelected]}>
    <Text style={styles.radioButtonText}>{children}</Text>
  </TouchableOpacity>
);

const AddressScreen = ({route}: any) => {
  // const {cartItems} = route.params;
  // console.log(cartItems);
  const {darkMode} = useTheme();
  const savedAddresses = useSelector(
    (state: any) => state.autheticate.userDetails.savedAddresses,
  );

  const [selectedAddressId, setSelectedAddressId] = useState<number>();
  const [selectedAddress, setSelectedAddress] = useState<any>({});

  // console.log(savedAddresses);
  const navigation = useNavigation<any>();

  const handleNext = () => {
    navigation.navigate('OrderSummary', {selectedAddress: selectedAddress});
  };

  const handleAddAddressNew = () => {
    // Navigate to new address form
    navigation.navigate('NewAddressForm');
  };

  const handleAddressSelect = (addressId: number) => {
    // console.log(addressId);
    const address = savedAddresses.find((add: any) => add.id === addressId);
    setSelectedAddress(address);
    setSelectedAddressId(addressId);
  };

  const AddressCard = ({address}: {address: any}) => (
    <TouchableOpacity onPress={() => handleAddressSelect(address.id)}>
      <View
        style={[
          styles.addressCard,
          {backgroundColor: darkMode ? 'black' : 'white'},
        ]}>
        <Text style={[styles.name, {color: darkMode ? 'white' : 'black'}]}>
          {address.fullName}
        </Text>
        <Text style={{color: darkMode ? 'white' : 'black'}}>
          {address.houseNo}, {address.area}, {address.city.name},{' '}
          {address.state.name} - {address.pincode}
        </Text>
        <Text style={{color: darkMode ? 'white' : 'black'}}>
          {address.phoneNumber}
        </Text>
      </View>
      <View style={styles.radiobuttonContainer}>
        <CustomRadioButton
          darkMode={darkMode}
          selected={selectedAddressId === address.id}
          onPress={() => setSelectedAddressId(address.id)}>
          {selectedAddressId === address.id ? (
            <Icon
              name="circle"
              size={20}
              color={darkMode ? 'white' : '#000000'}
            />
          ) : (
            <Icon
              name="circle-o"
              size={20}
              color={darkMode ? '#bababa' : '#dedede'}
            />
          )}
        </CustomRadioButton>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.maincontainer,
        {backgroundColor: darkMode ? 'black' : 'white'},
      ]}>
      <CustomButtonComponent
        text="Add a new address"
        color={darkMode ? '#242424' : 'white'}
        onSubmit={handleAddAddressNew}
        textcolor={darkMode ? 'white' : '#007fc9'}
        logo="plus"
      />
      <FlatList
        data={savedAddresses}
        renderItem={({item}) => <AddressCard address={item} />}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => <Text>No saved addresses found</Text>}
      />
      <View style={styles.nextbtn}>
        <CustomButtonComponent
          text="Confirm Address"
          color={darkMode ? 'white' : 'black'}
          onSubmit={handleNext}
          textcolor={darkMode ? 'black' : 'white'}
          disabled={selectedAddressId ? false : true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    // backgroundColor: '#fff',
    flex: 1,
    padding: 10,
  },
  addressCard: {
    // backgroundColor: '#ffffff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 1,
    position: 'relative',
  },
  name: {
    fontWeight: 'bold',
    // color: 'black',
  },
  nextbtn: {
    marginTop: 'auto',
  },
  radiobuttonContainer: {
    position: 'absolute',
    right: 0,
    top: 20,
  },
  radioButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginLeft: 10,
  },
  radioButtonText: {
    // marginRight: 5,
    fontSize: 10,
  },
  radioButtonTextSelected: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 10,
  },
  radioButtonSelected: {
    borderColor: '#000',
    fontWeight: 'bold',
  },
});

export default AddressScreen;
