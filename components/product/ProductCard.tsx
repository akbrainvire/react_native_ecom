import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const ProductCard = ({product}: any) => {
  const {title, description, price, rating, images} = product;

  // Render item for carousel
  const renderCarouselItem = ({item}: any) => {
    return (
      <View style={styles.carouselItem}>
        <Image source={{uri: item}} style={styles.carouselImage} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>Price: ${price}</Text>
      <Text style={styles.rating}>Rating: {rating}</Text>
      <Carousel
        data={images}
        renderItem={renderCarouselItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width - 40}
        loop={true}
        autoplay={true}
        autoplayInterval={3000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
  },
  price: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rating: {
    marginBottom: 10,
  },
  carouselItem: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  carouselImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
});

export default ProductCard;
