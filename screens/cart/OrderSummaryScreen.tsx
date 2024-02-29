import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Image} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import CustomButtonComponent from '../../components/generic/CustomButtonComponent';
import {useSelector} from 'react-redux';
import {useTheme} from '../../context/ThemeContext';

const CartItem = ({item, darkMode}: any) => (
  <View style={styles.container}>
    <Image source={{uri: item.thumbnail}} style={styles.image} />
    <View style={styles.textContainer}>
      <Text style={[styles.name, {color: darkMode ? 'white' : 'black'}]}>
        {item.name}
      </Text>
      <Text style={[styles.brand, {color: darkMode ? 'grey' : 'grey'}]}>
        {item.brand}
      </Text>
      <Text style={[styles.price, {color: darkMode ? 'white' : 'black'}]}>
        Total Price: ${item.totalPrice} (${item.price} x {item.quantity})
      </Text>
    </View>
  </View>
);

const AddressText = ({
  label,
  data,
  darkMode,
}: {
  label: string;
  data: string;
  darkMode: boolean;
}) => {
  return (
    <View style={styles.addressCardtextContainer}>
      <Text
        style={[
          styles.textaddStylebold,
          {color: darkMode ? 'white' : 'black'},
        ]}>
        {label}
      </Text>
      <Text
        style={[
          styles.textaddStylelight,
          {color: darkMode ? 'white' : 'black'},
        ]}>
        {data}
      </Text>
    </View>
  );
};

const OrderSummaryScreen = ({route}: any) => {
  const {selectedAddress} = route.params;
  const cartItems = useSelector((state: any) => state.cart.cartItems);
  const navigation = useNavigation<any>();
  const {darkMode} = useTheme();

  const handleNext = () => {
    navigation.navigate('PaymentScreen');
  };

  const totalSum = cartItems.reduce(
    (sum: any, item: any) => sum + item.totalPrice,
    0,
  );

  return (
    <View
      style={[
        styles.maincontainer,
        {backgroundColor: darkMode ? 'black' : 'white'},
      ]}>
      <FlatList
        data={cartItems}
        renderItem={({item}) => <CartItem item={item} darkMode={darkMode} />}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={
          <View>
            <Text
              style={[styles.heading, {color: darkMode ? 'white' : 'black'}]}>
              Delivery Address
            </Text>
            <View
              style={[
                styles.addressCard,
                {backgroundColor: darkMode ? 'black' : 'white'},
              ]}>
              <AddressText
                label="House Number : "
                data={selectedAddress.houseNo}
                darkMode={darkMode}
              />
              <AddressText
                label="Area : "
                data={selectedAddress.area}
                darkMode={darkMode}
              />
              <AddressText
                label="City : "
                data={selectedAddress.city}
                darkMode={darkMode}
              />
              <AddressText
                label="State : "
                data={selectedAddress.state}
                darkMode={darkMode}
              />
              <AddressText
                label="Pin Code : "
                data={selectedAddress.pincode}
                darkMode={darkMode}
              />
              <AddressText
                label="Mobile Number : "
                data={selectedAddress.phoneNumber}
                darkMode={darkMode}
              />
            </View>
            <Text style={styles.heading}>Cart Items</Text>
          </View>
        }
        ListFooterComponent={
          <View style={styles.footerContainer}>
            <View style={styles.nextbtn}>
              <View style={styles.totalContainer}>
                <Text
                  style={[
                    styles.totalText,
                    {color: darkMode ? 'white' : 'black'},
                  ]}>
                  Total ({cartItems.length} items)
                </Text>
                <Text
                  style={[
                    styles.totalPriceValue,
                    {color: darkMode ? 'white' : 'black'},
                  ]}>
                  ${totalSum}
                </Text>
              </View>
              <View style={styles.nextbtnContainer}>
                <CustomButtonComponent
                  text="Next"
                  color={darkMode ? 'white' : 'black'}
                  onSubmit={handleNext}
                  textcolor={darkMode ? 'black' : 'white'}
                />
              </View>
            </View>
          </View>
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  maincontainer: {
    // backgroundColor: '#fff',
    paddingHorizontal: 10,
    flex: 1,
  },
  footerContainer: {
    flex: 1,
  },
  nextbtnContainer: {
    marginTop: 'auto',
  },
  nextbtn: {
    marginTop: 'auto',
  },
  textaddStylelight: {
    fontSize: 14,
    color: 'grey',
  },
  textaddStylebold: {
    fontSize: 16,
    fontWeight: 'bold',
    // color: 'black',
  },
  container: {
    flexDirection: 'row',
    padding: 10,
    elevation: 1,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    // color: 'black',
    fontSize: 16,
  },
  brand: {
    // color: 'gray',
  },
  price: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  totalContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  totalText: {
    fontSize: 16,
    marginRight: 10,
  },
  totalPriceValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  heading: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    // color: 'black',
  },
  addressCard: {
    // backgroundColor: '#ffffff',
    padding: 10,
    margin: 5,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 8,
  },
  addRessname: {
    fontWeight: 'bold',
    color: 'black',
  },
  addressCardtextContainer: {
    flexDirection: 'row',
    gap: 5,
  },
});
export default OrderSummaryScreen;
