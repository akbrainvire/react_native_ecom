import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Image} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import CustomButtonComponent from '../../components/generic/CustomButtonComponent';
import {useSelector} from 'react-redux';

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
  const cartItems = useSelector((state: any) => state.cart.cartItems);
  const navigation = useNavigation<any>();

  const handleNext = () => {
    navigation.navigate('PaymentScreen');
  };

  const totalSum = cartItems.reduce(
    (sum: any, item: any) => sum + item.totalPrice,
    0,
  );

  return (
    <View style={styles.maincontainer}>
      <FlatList
        data={cartItems}
        renderItem={({item}) => <CartItem item={item} />}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={
          <View>
            <Text style={styles.heading}>Delivery Address</Text>
            <View style={styles.addressCard}>
              <AddressText
                label="House Number : "
                data={selectedAddress.houseNo}
              />
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
          </View>
        }
        ListFooterComponent={
          <View style={styles.footerContainer}>
            <View style={styles.nextbtn}>
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>
                  Total ({cartItems.length} items)
                </Text>
                <Text style={styles.totalPriceValue}>${totalSum}</Text>
              </View>
              <View style={styles.nextbtnContainer}>
                <CustomButtonComponent
                  text="Next"
                  color="black"
                  onSubmit={handleNext}
                  textcolor="white"
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
    backgroundColor: '#fff',
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
