import {View, Text} from 'react-native';
import React from 'react';

import ProductCategories from './ProductCategories';

const DashboardScreen = () => {
  return (
    <View style={{width: '100%', height: '100%'}}>
      {/* <Text>DashboardScreen</Text> */}
      <ProductCategories />
    </View>
  );
};

export default DashboardScreen;
