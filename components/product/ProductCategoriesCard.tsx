import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';

const Card = ({item, darkMode}: any) => {
  return (
    <View style={[styles.cardContainer, {backgroundColor: 'trasparent'}]}>
      <Image
        source={require('../../assets/product.jpg')}
        style={styles.image}
        resizeMode="cover"
      />
      <View
        style={[
          styles.overlay,
          {
            backgroundColor: darkMode
              ? '#000000ae'
              : 'rgba(255, 255, 255, 0.678)',
          },
        ]}>
        <Text
          style={[styles.productName, {color: darkMode ? 'white' : 'black'}]}>
          {item.toUpperCase()}
        </Text>
        <Text
          style={[styles.productsCount, {color: darkMode ? 'white' : 'black'}]}>
          358 Products
        </Text>
      </View>
    </View>
  );
};

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  cardContainer: {
    width: width / 2.34,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    overflow: 'hidden',
    marginHorizontal: 10,
    marginBottom: 20,
    shadowColor: '#0e0e0e',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 4,
    // backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 200,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: 'rgba(255, 255, 255, 0.678)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productsCount: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Card;
