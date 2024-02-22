import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Badge} from 'react-native-elements';
import {useSelector} from 'react-redux';

const CartHeaderRight = ({paddingRight, color}: any) => {
  const navigation = useNavigation<any>();

  const cartItemCount = useSelector((state: any) => state.cart.cartItemCount);

  const navigateToCart = () => {
    navigation.navigate('Cart Screen');
  };
  return (
    <TouchableOpacity
      onPress={navigateToCart}
      style={[styles.container, paddingRight && styles.applyRightPadding]}>
      <Icon name="bag-handle" size={28} color={color ? color : 'black'} />

      <Badge
        badgeStyle={{backgroundColor: 'black'}}
        textStyle={{color: 'white'}}
        value={cartItemCount}
        containerStyle={{position: 'absolute', top: -4, right: 15}}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  applyRightPadding: {
    paddingRight: 20,
  },
});

export default CartHeaderRight;
