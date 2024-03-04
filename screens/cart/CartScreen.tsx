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
import {useTheme} from '../../context/ThemeContext';

const CartScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {cartItems} = useSelector((state: any) => state.cart);
  const {darkMode} = useTheme();
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
    <ScrollView
      style={[{backgroundColor: darkMode ? 'black' : 'white'}]}
      contentContainerStyle={styles.mainContainer}>
      {cartItems.length > 0 ? (
        cartItems.map((item: any, i: any) => (
          <View
            key={`${item.id}-${item.name}-${item.size}`}
            style={[
              styles.card,
              {
                borderColor: darkMode ? 'white' : 'black',
                borderWidth: darkMode ? 1 : 0,
                borderRadius: 15,
              },
            ]}>
            <Image
              // source={require('../../assets/m3.jpg')}
              source={{uri: item.thumbnail}}
              style={styles.image}
              resizeMode="cover"
            />
            <View
              style={[
                styles.counterContainer,
                {backgroundColor: darkMode ? 'black' : 'white'},
              ]}>
              <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)}>
                <View
                  style={[
                    styles.counterButton,
                    {backgroundColor: darkMode ? 'black' : 'white'},
                  ]}>
                  <Text
                    style={[
                      styles.removeButton,
                      {backgroundColor: darkMode ? 'black' : 'white'},
                      {color: darkMode ? 'white' : 'black'},
                    ]}>
                    -
                  </Text>
                </View>
              </TouchableOpacity>
              <Text
                style={[
                  styles.quantity,
                  {color: darkMode ? 'white' : 'black'},
                ]}>
                {item.quantity}
              </Text>
              <TouchableOpacity onPress={() => handleIncreasetoCart(item)}>
                <View
                  style={[
                    styles.counterButton,
                    {backgroundColor: darkMode ? 'black' : 'white'},
                  ]}>
                  <Text
                    style={[
                      styles.addButton,
                      {backgroundColor: darkMode ? 'black' : 'white'},
                      {color: darkMode ? 'white' : 'black'},
                    ]}>
                    +
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.removeButtonContainer}>
              <TouchableOpacity onPress={() => handleRemoveWhole(item.id)}>
                <View
                  style={[
                    styles.removeButtonIcon,
                    {backgroundColor: darkMode ? 'white' : 'black'},
                  ]}>
                  <Icon2
                    name="delete"
                    size={18}
                    color={darkMode ? 'black' : '#fff'}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.brandnamePriceContainer}>
              <View>
                <Text
                  style={[styles.brand, {color: darkMode ? 'white' : 'black'}]}>
                  {item.brand}
                </Text>
                <Text style={styles.name}>{item.name}</Text>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text
                  style={[
                    styles.totalPrice,
                    {color: darkMode ? 'white' : 'black'},
                  ]}>
                  ${item.totalPrice}
                </Text>
                <Text
                  style={[styles.name, {color: darkMode ? 'white' : 'black'}]}>
                  Size: {item.size}
                </Text>
              </View>
            </View>
          </View>
        ))
      ) : (
        <Text
          style={[styles.noproductcart, {color: darkMode ? 'white' : 'black'}]}>
          No product in Cart
        </Text>
      )}
      {cartItems.length > 0 ? (
        <View
          style={[
            styles.footer,
            {backgroundColor: darkMode ? 'black' : 'white'},
          ]}>
          <View style={styles.totalContainer}>
            <Text
              style={[styles.totalText, {color: darkMode ? 'white' : 'black'}]}>
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
          <View style={styles.btnproceed}>
            <CustomButtonComponent
              LogoComponent={() => (
                <Icon
                  name="chevron-forward-outline"
                  size={24}
                  color={darkMode ? 'black' : '#fff'}
                />
              )}
              logoComp={true}
              text="Proceed to Checkout"
              color={darkMode ? 'white' : 'black'}
              onSubmit={handleProceedCheckout}
              textcolor={darkMode ? 'black' : 'white'}
              width="100%"
              marginTop="auto"
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
  mainContainer: {
    padding: 10,
    paddingBottom: 20,
    // flexShrink: 1,
  },
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
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
    // backgroundColor: '#f6f6f6',
    borderRadius: 20,
    bottom: 55,
    left: 20,
  },
  counterButton: {
    // backgroundColor: '#f6f6f6',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 20,
  },
  removeButton: {
    fontSize: 15,
    // color: 'black',
    // backgroundColor: '#f6f6f6',
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  addButton: {
    fontSize: 15,
    // color: 'black',
    // backgroundColor: '#f6f6f6',
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
    // backgroundColor: '#000000',
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
    // color: 'black',
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
    // backgroundColor: '#fff',
    // marginTop: 'auto',
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
    flexDirection: 'row',
    flex: 1,
    // marginTop: 'auto',
    // paddingBottom: 20,
  },
});

export default CartScreen;
