import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';

const Card = ({item}: any) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={require('../../assets/PngItem_1369939.png')}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Text style={styles.productName}>{item.toUpperCase()}</Text>
        <Text style={styles.productsCount}>358 Products</Text>
      </View>
    </View>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  cardContainer: {
    width: width / 2.35,
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
    backgroundColor: 'white',
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
    backgroundColor: 'rgba(255, 255, 255, 0.678)', // Add opacity to overlay
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
