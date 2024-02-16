import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import React from 'react';
import StepProgress from '../../components/cart/StepProgress';
import {useNavigation} from '@react-navigation/native';
import CustomButtonComponent from '../../components/generic/CustomButtonComponent';
import {useSelector} from 'react-redux';
import {Image} from 'react-native-elements';

const CartItem = ({item}: any) => (
  <View style={styles.container}>
    <Image source={{uri: item.thumbnail}} style={styles.image} />
    <View style={styles.textContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.brand}>{item.brand}</Text>
      <Text style={styles.price}>
        Total Price: ${item.totalPrice} (${item.price} x {item.quantity})
      </Text>
    </View>
  </View>
);

const AddressText = ({label, data}: {label: string; data: string}) => {
  return (
    <View style={styles.addressCardtextContainer}>
      <Text style={[styles.textaddStylebold]}>{label}</Text>
      <Text style={[styles.textaddStylelight]}>{data}</Text>
    </View>
  );
};

const OrderSummaryScreen = ({route}: any) => {
  const {selectedAddress} = route.params;
  console.log(selectedAddress);
  // const {selectedAddress} = route;
  const cartItems = useSelector((state: any) => state.cart.cartItems);
  console.log(cartItems);
  const navigation = useNavigation<any>();

  const handleNext = () => {
    navigation.navigate('PaymentScreen');
  };

  const totalSum = cartItems.reduce(
    (sum: any, item: any) => sum + item.totalPrice,
    0,
  );

  return (
    <ScrollView style={styles.maincontainer}>
      {/* <StepProgress currentStep={2} /> */}
      <Text style={styles.heading}>Delivery Address</Text>
      <View style={styles.addressCard}>
        {/* <Text style={styles.addRessname}>{selectedAddress.fullName}</Text> */}
        <AddressText label="House Number : " data={selectedAddress.houseNo} />
        <AddressText label="Area : " data={selectedAddress.area} />
        <AddressText label="City : " data={selectedAddress.city} />
        <AddressText label="State : " data={selectedAddress.state} />
        <AddressText label="Pin Code : " data={selectedAddress.pincode} />
        <AddressText
          label="Mobile Number : "
          data={selectedAddress.phoneNumber}
        />
      </View>

      <Text style={styles.heading}>Cart Items</Text>
      <FlatList
        data={cartItems}
        renderItem={({item}) => <CartItem item={item} />} // Render each item using CartItem component
        keyExtractor={item => item.id.toString()}
      />
      <View style={styles.nextbtn}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total ({cartItems.length} items)</Text>
          <Text style={styles.totalPriceValue}>${totalSum}</Text>
        </View>
        <CustomButtonComponent
          text="Next"
          color="black"
          onSubmit={handleNext}
          textcolor="white"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    flex: 1,
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
    color: 'black',
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
    color: 'black',
    fontSize: 16,
  },
  brand: {
    color: 'gray',
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
    color: 'black',
  },
  addressCard: {
    backgroundColor: '#ffffff',
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
