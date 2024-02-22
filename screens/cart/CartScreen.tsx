import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  addToCart,
  removeFromCart,
  removeFromCartFull,
} from '../../store/CartSlice';
import CartSummary from '../../components/cart/CartSummary';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import CustomButtonComponent from '../../components/generic/CustomButtonComponent';

const CartScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {cartItems} = useSelector((state: any) => state.cart);

  // console.log(cartItems, 'cartitems');

  const handleRemoveFromCart = (id: any) => {
    // console.log(id, 'idremove');
    dispatch(removeFromCart(id));
  };

  const handleIncreasetoCart = (item: any) => {
    const dataToSend = {
      ...item,
      quantity: 1,
    };
    dispatch(addToCart(dataToSend));
  };

  const handleRemoveWhole = (id: any) => {
    dispatch(removeFromCartFull(id));
  };

  function generateRandomId(item: any, length = 8) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';

    for (let i = 0; i < length; i++) {
      randomId += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }

    return item.id + '-' + item.name + '-' + randomId;
  }

  // console.log(cartItems);

  const handleProceedCheckout = () => {
    // navigation.navigate('AddressScreen', {cartItems: cartItems});
    navigation.navigate('AddressScreen');
  };

  const totalSum = cartItems.reduce(
    (sum: any, item: any) => sum + item.totalPrice,
    0,
  );

  return (
    <ScrollView style={styles.container}>
      {cartItems.length > 0 ? (
        cartItems.map((item: any, i: any) => (
          <View
            key={`${item.id}-${item.name}-${item.size}`}
            style={styles.card}>
            <Image
              // source={require('../../assets/m3.jpg')}
              source={{uri: item.thumbnail}}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.counterContainer}>
              <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)}>
                <View style={styles.counterButton}>
                  <Text style={styles.removeButton}>-</Text>
                </View>
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => handleIncreasetoCart(item)}>
                <View style={styles.counterButton}>
                  <Text style={styles.addButton}>+</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.removeButtonContainer}>
              <TouchableOpacity onPress={() => handleRemoveWhole(item.id)}>
                <View style={styles.removeButtonIcon}>
                  <Icon2 name="delete" size={18} color="#fff" />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.brandnamePriceContainer}>
              <View>
                <Text style={styles.brand}>{item.brand}</Text>
                <Text style={styles.name}>{item.name}</Text>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={styles.totalPrice}>${item.totalPrice}</Text>
                <Text style={styles.name}>Size: {item.size}</Text>
              </View>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noproductcart}>No product in Cart</Text>
      )}
      {cartItems.length > 0 ? (
        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>
              Total ({cartItems.length} items)
            </Text>
            <Text style={styles.totalPriceValue}>${totalSum}</Text>
          </View>
          <View style={styles.btnproceed}>
            <CustomButtonComponent
              LogoComponent={() => (
                <Icon name="chevron-forward-outline" size={24} color="#fff" />
              )}
              logoComp={true}
              text="Proceed to Checkout"
              color="black"
              onSubmit={handleProceedCheckout}
              textcolor="white"
              width="100%"
            />
          </View>
        </View>
      ) : (
        ''
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  card: {
    // backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    // elevation: 3,
    position: 'relative',
  },
  noproductcart: {
    fontSize: 20,
    textAlign: 'center',
  },
  brandnamePriceContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalPrice: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 130,
    borderRadius: 10,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginVertical: 10,
    position: 'absolute',
    backgroundColor: '#f6f6f6',
    borderRadius: 20,
    bottom: 55,
    left: 20,
  },
  counterButton: {
    backgroundColor: '#f6f6f6',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 20,
  },
  removeButton: {
    fontSize: 15,
    color: 'black',
    backgroundColor: '#f6f6f6',
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  addButton: {
    fontSize: 15,
    color: 'black',
    backgroundColor: '#f6f6f6',
    paddingHorizontal: 4,
    paddingVertical: 2,
    // borderTopRightRadius: 20,
    // borderBottomRightRadius: 20,
    // borderBottomLeftRadius: 20,
    // borderTopLeftRadius: 20,
  },
  removeButtonContainer: {
    // backgroundColor: '#f6f6f6',
    position: 'absolute',
    top: 22,
    right: 30,
  },
  removeButtonIcon: {
    backgroundColor: '#000000',
    borderRadius: 15,
    padding: 4,
  },
  quantity: {
    fontSize: 18,
  },
  brand: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    color: 'black',
  },
  name: {
    color: 'grey',
  },
  footer: {
    flex: 1,
    // position: 'relative',
    gap: 10,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginTop: 'auto',
  },
  totalContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 16,
    marginRight: 10,
  },
  totalPriceValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  proceedButton: {
    // position: 'absolute',
    // bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 30,
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 5,
  },
  btnproceed: {
    marginTop: 'auto',
    flexDirection: 'row',
  },
});

export default CartScreen;
