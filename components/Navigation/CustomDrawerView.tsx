import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {CustomDrawerTabButton} from './CustomDrawerTabButton';

const CustomDrawerView = ({navigation, ...props}: any) => {
  // console.log(props);
  const {route, index} = props.state;
  const navigateToScreen = (screenName: string) => {
    navigation.navigate(screenName);
  };

  let activeRouteName = props.state.routes[index].name;
  // console.log(activeRouteName == 'Home', 'acrn');

  const [activeRoute, setActiveRoute] = useState('Home');

  useEffect(() => {
    console.log('first');
    setActiveRoute(activeRouteName);
  }, [activeRouteName, activeRoute]);

  return (
    <View style={styles.container}>
      <CustomDrawerTabButton
        onPress={() => navigateToScreen('Home')}
        label={'home'}
        isActive={activeRouteName == 'Home'}
      />

      <CustomDrawerTabButton
        onPress={() => navigateToScreen('Cart')}
        label={'cart'}
        isActive={activeRouteName == 'Cart'}
      />
      <CustomDrawerTabButton
        onPress={() => navigateToScreen('Notification')}
        label={'notification'}
        isActive={activeRouteName == 'Notification'}
      />
      <CustomDrawerTabButton
        onPress={() => navigateToScreen('Profile')}
        label={'profile'}
        isActive={activeRouteName == 'Profile'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    // paddingHorizontal: 20,
  },
  drawerItem: {
    paddingVertical: 20,
  },
  drawerActive: {},
  drawerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default CustomDrawerView;
