import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from '../../../context/ThemeContext';

const OrderDetail = ({navigation, route}: any) => {
  console.log(route.params.item);

  const {darkMode, colors} = useTheme();

  return (
    <View
      style={[
        styles.mainContainer,
        {backgroundColor: darkMode ? colors.black : colors.white},
      ]}>
      <Text style={[{color: darkMode ? colors.white : colors.black}]}>
        OrderDetail
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default OrderDetail;
