import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {colors} from '../../theme/theme';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../../store/CartSlice';
import HeaderBackButton from '../../components/generic/HeaderBackButton';
import ColorSelect from '../../components/generic/ColorSelect';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useToast} from 'react-native-toast-notifications';
import CustomButtonComponent from '../../components/generic/CustomButtonComponent';
import CartHeaderRight from '../../components/cart/CartHeaderRight';
import {addToWishlist, removeFromWishlist} from '../../store/WishlistedSlice';
import CustomCarousel from '../../components/generic/CustomCarousel';
import {useTheme} from '../../context/ThemeContext';

export const CustomRadioButton = ({
  selected,
  onPress,
  darkMode,
  children,
}: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.radioButton,
      selected && {
        borderColor: darkMode ? 'white' : 'black',
        backgroundColor: darkMode ? 'white' : 'black',
      },
    ]}>
    <Text
      style={[
        styles.radioButtonText,
        {color: darkMode ? 'white' : 'black'},
        selected && styles.radioButtonTextSelected,
        selected && {color: darkMode ? 'black' : 'white'},
      ]}>
      {children}
    </Text>
  </TouchableOpacity>
);

const ProductDetail = ({navigation, route}: any) => {
  const {item} = route.params;
  const [selectedSize, setSelectedSize] = useState('S');
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('');
  const toast = useToast();
  const carouselRef = React.createRef<any>();
  const dispatch = useDispatch();
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const {darkMode} = useTheme();
  const isWishlisted = useSelector((state: any) =>
    state.wishlist.wishlisted.some((itemc: any) => itemc.id === item.id),
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const renderPagination = () => (
    <Pagination
      dotsLength={item.images.length}
      activeDotIndex={activeIndex}
      containerStyle={{paddingTop: 10}}
      dotStyle={{
        width: 10,
        height: 10,
        borderRadius: 10,
        marginHorizontal: -5,
        backgroundColor: 'white',
      }}
      inactiveDotStyle={{
        backgroundColor: '#7a7a7a',
      }}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.8}
    />
  );

  // console.log(item, 'items-pd');

  const AddToWishlist = () => {
    dispatch(
      addToWishlist({
        name: item.title,
        brand: item.brand,
        quantity: quantity,
        size: selectedSize !== '' ? selectedSize : 'XL',
        price: item.price,
        thumbnail: item.thumbnail,
        id: item.id,
        color: color,
      }),
    );
    toast.show('Successfully added to wishlist', {
      type: 'custom',
      placement: 'top',
      duration: 3000,
      animationType: 'slide-in',
    });
  };

  const toastNavigateToCart = () => {
    navigation.navigate('Cart');
  };

  const RemoveFromWishlist = () => {
    dispatch(removeFromWishlist(item.id));
  };

  const addToCartFunction = () => {
    const dataToSend = {
      name: item.title,
      brand: item.brand,
      quantity: quantity,
      size: selectedSize !== '' ? selectedSize : 'XL',
      price: item.price,
      thumbnail: item.thumbnail,
      id: `${item.id}-${item.title}-${selectedSize}`,
      color: color,
    };

    dispatch(addToCart(dataToSend));
    toast.show('Successfully added to cart, Click here to check', {
      type: 'custom',
      placement: 'top',
      duration: 3000,
      onPress: toastNavigateToCart,
      animationType: 'slide-in',
    });
  };

  const finishedRating = (rating: any) => {
    console.log(rating, 'rating');
  };

  const handleColorSelect = (color: any) => {
    console.log(color);
    setColor(color);
  };

  const colors = ['black', 'silver', 'navy', 'lime'];

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          height: Dimensions.get('window').height * 0.5,
          position: 'relative',
        }}>
        <View style={styles.backBtn}>
          <HeaderBackButton />
        </View>
        {/* <View style={styles.carouselContainer}> */}
        {isWishlisted ? (
          <View
            style={[
              styles.wishlistBtn,
              {backgroundColor: darkMode ? '#535353' : 'white'},
            ]}>
            <TouchableOpacity onPress={() => RemoveFromWishlist()}>
              <Icon name="heart" size={23} color="red" />
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={[
              styles.wishlistBtn,
              {backgroundColor: darkMode ? '#535353' : 'white'},
            ]}>
            <TouchableOpacity onPress={() => AddToWishlist()}>
              <Icon name="heart-o" size={23} color="red" />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.cartButton}>
          <CartHeaderRight />
        </View>

        {/* <Carousel
          ref={carouselRef}
          data={item.images}
          renderItem={({item}: any) => (
            <Image
              source={{uri: item}}
              style={styles.image}
              resizeMode="contain"
            />
          )}
          onSnapToItem={index => setActiveIndex(index)}
          autoplay={true}
          autoplayInterval={2500}
          loop={true}
          loopClonesPerSide={2}
          sliderHeight={Dimensions.get('window').height * 0.5}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
          itemHeight={Dimensions.get('window').height * 0.5}></Carousel>
        {renderPagination()} */}
        {/* </View> */}
        <CustomCarousel images={item.images} />
      </View>
      <SafeAreaView>
        <ScrollView
          style={[
            styles.contentContainer,
            {backgroundColor: darkMode ? 'black' : 'white'},
          ]}>
          <View style={styles.contentsubContainer}>
            <View style={styles.productInfo}>
              <View style={styles.productDetailContainer}>
                <Text
                  style={[styles.title, {color: darkMode ? 'white' : 'black'}]}>
                  {item.title}
                </Text>
                <Text
                  style={[styles.brand, {color: darkMode ? 'white' : 'black'}]}>
                  Brand: {item.brand}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // width: 'auto',
                    // backgroundColor: 'transparent',
                  }}>
                  <Rating
                    type="custom"
                    showRating={false}
                    readonly={true}
                    onFinishRating={finishedRating}
                    ratingBackgroundColor="transparent"
                    style={styles.rating}
                    tintColor={darkMode ? 'black' : 'white'}
                    fractions={1}
                    startingValue={item.rating}
                    imageSize={12}
                  />
                  <Text style={styles.ratingText}>(280 Review)</Text>
                </View>
              </View>
              <View
                style={[
                  styles.quantityContainer,
                  {
                    backgroundColor: darkMode ? 'black' : '#ececec',
                    borderColor: darkMode ? 'white' : 'black',
                    borderWidth: darkMode ? 1 : 0,
                  },
                ]}>
                <TouchableOpacity onPress={decreaseQuantity}>
                  <Text
                    style={[
                      styles.quantityButton,
                      {color: darkMode ? 'white' : 'black'},
                    ]}>
                    -
                  </Text>
                </TouchableOpacity>
                <Text
                  style={[
                    styles.quantity,
                    {color: darkMode ? 'white' : 'black'},
                  ]}>
                  {quantity}
                </Text>
                <TouchableOpacity onPress={increaseQuantity}>
                  <Text
                    style={[
                      styles.quantityButton,
                      {color: darkMode ? 'white' : 'black'},
                    ]}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.sizeContainer}>
              <Text
                style={[
                  styles.othertitle,
                  {color: darkMode ? 'white' : 'black'},
                ]}>
                Size
              </Text>
              <View style={styles.sizeButtonContainer}>
                <CustomRadioButton
                  selected={selectedSize === 'S'}
                  darkMode={darkMode}
                  onPress={() => {
                    setSelectedSize('S');
                    setQuantity(1);
                  }}>
                  S
                </CustomRadioButton>
                <CustomRadioButton
                  selected={selectedSize === 'M'}
                  darkMode={darkMode}
                  onPress={() => {
                    setSelectedSize('M');
                    setQuantity(1);
                  }}>
                  M
                </CustomRadioButton>
                <CustomRadioButton
                  selected={selectedSize === 'L'}
                  darkMode={darkMode}
                  onPress={() => {
                    setSelectedSize('L');
                    setQuantity(1);
                  }}>
                  L
                </CustomRadioButton>
                <CustomRadioButton
                  selected={selectedSize === 'XL'}
                  darkMode={darkMode}
                  onPress={() => {
                    setSelectedSize('XL');
                    setQuantity(1);
                  }}>
                  XL
                </CustomRadioButton>
                <CustomRadioButton
                  selected={selectedSize === 'XXL'}
                  darkMode={darkMode}
                  onPress={() => {
                    setSelectedSize('XXL');
                    setQuantity(1);
                  }}>
                  XXL
                </CustomRadioButton>
              </View>
              <ColorSelect colors={colors} onSelectColor={handleColorSelect} />
            </View>
            <Text
              style={[
                styles.othertitle,
                {color: darkMode ? 'white' : 'black'},
              ]}>
              Description
            </Text>
            <Text
              style={[
                styles.description,
                {color: darkMode ? 'white' : 'black'},
              ]}>
              {item.description}
            </Text>

            <View style={styles.priceContainer}>
              <View style={styles.pricesubContainer}>
                <Text
                  style={[
                    styles.priceT,
                    {color: darkMode ? 'white' : 'black'},
                  ]}>
                  Price
                </Text>

                <Text
                  style={[styles.price, {color: darkMode ? 'white' : 'black'}]}>
                  ${item.price}
                </Text>
              </View>
              <CustomButtonComponent
                onSubmit={addToCartFunction}
                text="Add to Cart"
                color="black"
                logo="cart-plus"
                textcolor="white"
                width="60%"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    // backgroundColor: 'white',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  productDetailContainer: {
    maxWidth: '80%',
  },

  productInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
    // color: 'black',
  },
  brand: {
    marginTop: 5,
  },
  ratingText: {
    fontSize: 12,
    color: '#656565',
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  contentsubContainer: {
    flex: 1,
    minHeight: Dimensions.get('window').height * 0.49,
    justifyContent: 'space-between',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 5,
    borderRadius: 15,
    // backgroundColor: '#ececec',
    maxWidth: '20%',
  },
  quantityButton: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  quantity: {
    fontSize: 20,
  },
  sizeContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // marginTop: 15,
  },

  sizeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // position: 'relative',
  },

  othertitle: {
    fontWeight: 'bold',
    fontSize: 18,
    // color: 'black',
    marginTop: 10,
  },
  description: {
    marginTop: 5,
  },
  rating: {
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginTop: 10,
    marginBottom: 10,
  },
  pricesubContainer: {
    justifyContent: 'flex-start',
  },
  priceT: {
    fontSize: 12,
    color: 'grey',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  addToCartButton: {
    marginLeft: 20,
    backgroundColor: colors.brown,
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  addToCartButtonText: {
    color: 'white',
  },
  radioButton: {
    height: 40,
    width: 40,
    borderWidth: 1.3,
    borderColor: '#ccc',
    borderRadius: 20,
    // paddingHorizontal: 10,
    // paddingVertical: 5,
    marginTop: 5,
    marginRight: 15,
    // marginLeft: 10,
  },
  radioButtonText: {
    // marginRight: 5,
    fontSize: 15,
    textAlign: 'center',
    paddingTop: 8,
  },
  radioButtonTextSelected: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    paddingTop: 8,
    fontSize: 15,
  },

  backBtn: {
    position: 'absolute',
    top: 1,
    left: 10,
    zIndex: 1,
  },
  wishlistBtn: {
    position: 'absolute',
    bottom: 15,
    right: 20,
    zIndex: 990,
    // backgroundColor: 'white',
    padding: 7,
    borderRadius: 30,
  },
  cartButton: {
    position: 'absolute',
    top: 15,
    right: 10,
    zIndex: 990,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 30,
  },
});

export default ProductDetail;
