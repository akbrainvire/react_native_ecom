import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchCategories from '../../screens/dashboard/SearchCategories';

const DrawerCustomHeader = ({drawer, showSearchCategories}: any) => {
  // console.log(drawer.navigation);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.drawerIconContainer}
        onPress={() => drawer.navigation.toggleDrawer()}>
        <Icon name="menu" size={24} color="black" />
      </TouchableOpacity>
      {showSearchCategories && <SearchCategories />}
    </View>
  );
};
let width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: width,
    flexDirection: 'row',
    // flex: 1,
    alignItems: 'center',
    // justifyContent: 'space-between',
    paddingHorizontal: 20,
    // paddingVertical: 15,
  },
  drawerIconContainer: {
    // marginRight: 'auto',
  },
  searchIconContainer: {
    // marginRight: 'auto',
  },
});

export default DrawerCustomHeader;
