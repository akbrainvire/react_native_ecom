import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Swipeable} from 'react-native-gesture-handler';
import {Animated} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {removeFromWishlist} from '../../../store/WishlistedSlice';
import {addToCart} from '../../../store/CartSlice';
import {useToast} from 'react-native-toast-notifications';
import {useTheme} from '../../../context/ThemeContext';

const MyFavourites = () => {
  const wishlisted = useSelector((state: any) => state.wishlist.wishlisted);
  const dispatch = useDispatch();
  const toast = useToast();
  const {darkMode} = useTheme();
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<any>,
    dragAnimatedValue: Animated.AnimatedInterpolation<any>,
  ) => {
    const opacity = dragAnimatedValue.interpolate({
      inputRange: [-50, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.swipedRow}>
        {/* <View style={styles.swipedConfirmationContainer}>
          <Text style={styles.deleteConfirmationText}>Are you sure?</Text>
        </View> */}
        <Animated.View style={[styles.deleteButton, {opacity}]}>
          <TouchableOpacity>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  const handleRemoveWishlist = (id: any) => {
    dispatch(removeFromWishlist(id));
  };

  const HandleAddtoCart = (id: any, item: any) => {
    console.log(item);
    const dataToSend = {
      name: item.name,
      brand: item.brand,
      quantity: 1,
      size: item.size,
      price: item.price,
      thumbnail: item.thumbnail,
      id: `${item.id}-${item.title}-${item.size}`,
      color: item.color,
    };
    dispatch(addToCart(dataToSend));

    toast.show('Successfully added to cart', {
      type: 'normal',
      placement: 'top',
      duration: 3000,
      animationType: 'slide-in',
    });
  };

  const renderItem = ({item}: {item: any}) => (
    // <Swipeable renderRightActions={renderRightActions}>
    <View
      style={[
        styles.cardContainer,
        {
          backgroundColor: darkMode ? 'black' : 'white',
          borderColor: darkMode ? 'white' : 'black',
          borderWidth: darkMode ? 1 : 0,
        },
      ]}>
      <Image source={{uri: item.thumbnail}} style={styles.thumbnail} />
      <View style={styles.detailsContainer}>
        <Text style={[styles.brand, {color: darkMode ? 'white' : 'black'}]}>
          {item.brand}
        </Text>
        <Text
          numberOfLines={2}
          style={[styles.name, {color: darkMode ? 'white' : 'black'}]}>
          {item.name}
        </Text>
        <Text
          numberOfLines={2}
          style={[styles.brand, {color: darkMode ? 'white' : 'black'}]}>
          ${item.price}
        </Text>
      </View>
      <View style={styles.removeButtonContainer}>
        <TouchableOpacity onPress={() => handleRemoveWishlist(item.id)}>
          <View style={styles.removeButtonIcon}>
            <Icon2 name="delete" size={18} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[
          styles.addToCartButton,
          {backgroundColor: darkMode ? 'white' : 'black'},
        ]}
        onPress={() => HandleAddtoCart(item.id, item)}>
        <Text
          style={[
            styles.addToCartButtonText,
            {color: darkMode ? 'black' : 'white'},
          ]}>
          Add to Cart
        </Text>
      </TouchableOpacity>
    </View>
    // </Swipeable>
  );

  console.log(wishlisted);

  return (
    <View
      style={[
        styles.mainContainer,
        {backgroundColor: darkMode ? 'black' : 'white'},
      ]}>
      {wishlisted.length > 0 ? (
        <FlatList
          data={wishlisted}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text
          style={[styles.noProducts, {color: darkMode ? 'white' : 'black'}]}>
          No items available
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: '#fff',
    padding: 10,
  },
  listContainer: {
    paddingBottom: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  thumbnail: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  removeButtonContainer: {
    // backgroundColor: '#f6f6f6',
    position: 'absolute',
    top: 5,
    right: 15,
  },
  removeButtonIcon: {
    backgroundColor: '#000000',
    borderRadius: 15,
    padding: 4,
  },
  brand: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  name: {
    fontSize: 14,
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: 'black',
    borderRadius: 5,
    padding: 8,
    marginLeft: 'auto',
    alignSelf: 'flex-end',
  },
  addToCartButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  deleteConfirmationText: {
    backgroundColor: 'red',
    color: 'white',
  },
  swipedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    paddingRight: 15,
    borderRadius: 8,
  },
  swipedConfirmationContainer: {
    marginRight: 'auto',
    padding: 10,
  },
  deleteButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 8,
  },
  deleteButtonText: {
    color: 'white',
  },
  noProducts: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',

    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default MyFavourites;
