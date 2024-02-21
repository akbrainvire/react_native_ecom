import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Badge} from 'react-native-elements';
import {useSelector} from 'react-redux';

const CartHeaderRight = () => {
  const navigation = useNavigation<any>();

  const cartItemCount = useSelector((state: any) => state.cart.cartItemCount);

  //   const handleSettingsPress = () => {
  //     navigation.navigate('Cart');
  //   };

  return (
    <TouchableOpacity style={styles.container}>
      <Icon name="bag-handle" size={28} color="#afafaf" />

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
  container: {
    paddingRight: 20,
  },
});

export default CartHeaderRight;
