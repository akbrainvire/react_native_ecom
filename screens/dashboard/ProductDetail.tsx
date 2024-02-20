import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import Carousel from 'react-native-snap-carousel'; // Import Carousel from the library
import {colors} from '../../theme/theme';
import {useDispatch} from 'react-redux';
import {addToCart} from '../../store/CartSlice';
import HeaderBackButton from '../../components/generic/HeaderBackButton';

export const CustomRadioButton = ({selected, onPress, children}: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.radioButton, selected && styles.radioButtonSelected]}>
    <Text style={styles.radioButtonText}>{children}</Text>
  </TouchableOpacity>
);

const ProductDetail = ({route}: any) => {
  const {item} = route.params;
  const [selectedSize, setSelectedSize] = useState('S');
  const [quantity, setQuantity] = useState(1);
  const carouselRef = React.createRef<any>(); // Create a reference for the carousel
  const dispatch = useDispatch();
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  console.log(item);

  const addToCartFunction = () => {
    const dataToSend = {
      name: item.title,
      brand: item.brand,
      quantity: quantity,
      size: selectedSize,
      price: item.price,
      thumbnail: item.thumbnail,
      id: item.id,
    };

    dispatch(addToCart(dataToSend));
  };

  const finishedRating = (rating: any) => {
    console.log(rating, 'rating');
  };

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
        <Carousel
          ref={carouselRef}
          data={item.images}
          renderItem={({item}: any) => (
            <Image
              source={{uri: item}}
              style={styles.image}
              resizeMode="contain"
            />
          )}
          autoplay={true}
          autoplayInterval={2500}
          loop={true}
          loopClonesPerSide={2}
          sliderHeight={Dimensions.get('window').height * 0.5}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
          itemHeight={Dimensions.get('window').height * 0.5}></Carousel>
        {/* </View> */}
      </View>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.contentsubContainer}>
          <View style={styles.productInfo}>
            <View style={styles.productDetailContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.brand}>Brand: {item.brand}</Text>
              <Rating
                type="custom"
                showRating={false}
                readonly={true}
                onFinishRating={finishedRating}
                ratingBackgroundColor="#00000000"
                style={styles.rating}
                fractions={1}
                startingValue={item.rating}
                imageSize={15}
              />
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={decreaseQuantity}>
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity onPress={increaseQuantity}>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.sizeContainer}>
            <Text>Select Size: </Text>
            <CustomRadioButton
              selected={selectedSize === 'S'}
              onPress={() => setSelectedSize('S')}>
              S
            </CustomRadioButton>
            <CustomRadioButton
              selected={selectedSize === 'M'}
              onPress={() => setSelectedSize('M')}>
              M
            </CustomRadioButton>
            <CustomRadioButton
              selected={selectedSize === 'L'}
              onPress={() => setSelectedSize('L')}>
              L
            </CustomRadioButton>
            <CustomRadioButton
              selected={selectedSize === 'XL'}
              onPress={() => setSelectedSize('XL')}>
              XL
            </CustomRadioButton>
          </View>
          <Text style={styles.descriptionTitle}>Description:</Text>
          <Text style={styles.description}>{item.description}</Text>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>Price: ${item.price}</Text>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={addToCartFunction}>
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    backgroundColor: 'white',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  productDetailContainer: {
    maxWidth: '80%',
  },

  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  brand: {
    marginTop: 5,
  },
  contentsubContainer: {
    flex: 1,
    minHeight: 375,
    justifyContent: 'space-between',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 5,
    borderRadius: 15,
    backgroundColor: '#ececec',
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  descriptionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
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
    marginTop: 20,
    marginBottom: 20,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 20,
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
    borderWidth: 1.3,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginLeft: 10,
  },
  radioButtonText: {
    // marginRight: 5,
    fontSize: 15,
  },
  radioButtonTextSelected: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
  },
  radioButtonSelected: {
    borderColor: '#000',
    fontWeight: 'bold',
  },
  backBtn: {
    position: 'absolute',
    top: 1,
    left: 10,
    zIndex: 1,
  },
});

export default ProductDetail;
