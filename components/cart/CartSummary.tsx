import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CartSummary = ({cartItems}: any) => {
  const totalSum = cartItems.reduce(
    (sum: any, item: any) => sum + item.totalPrice,
    0,
  );

  return (
    <View style={styles.container}>
      {cartItems.map((item: any) => (
        <View key={item.id} style={styles.itemContainer}>
          <View style={styles.itemInfo}>
            <Text>{item.brand}</Text>
            <Text>{item.name}</Text>
          </View>
          <Text>${item.totalPrice}</Text>
        </View>
      ))}
      <View style={styles.horizontalLine} />
      <View style={styles.totalContainer}>
        <Text>Total Price:</Text>
        <Text>${totalSum}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  itemInfo: {
    flex: 1,
  },
  horizontalLine: {
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default CartSummary;
