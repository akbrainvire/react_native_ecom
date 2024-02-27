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

  const [activeRoute, setActiveRoute] = useState('Setting');

  useEffect(() => {
    console.log('first');
    setActiveRoute(activeRouteName);
  }, [activeRouteName, activeRoute]);

  return (
    <View style={styles.container}>
      <CustomDrawerTabButton
        onPress={() => navigateToScreen('Setting')}
        label={'settings'}
        isActive={activeRouteName == 'Setting'}
      />

      <CustomDrawerTabButton
        onPress={() => navigateToScreen('Language Setting')}
        label={'languages'}
        isActive={activeRouteName == 'Language Setting'}
      />
      <CustomDrawerTabButton
        onPress={() => navigateToScreen('Notification Setting')}
        label={'notification'}
        isActive={activeRouteName == 'Notification Setting'}
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
