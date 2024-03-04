import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import {useTheme} from '../../context/ThemeContext';

const CustomStatusBar = ({route}: any) => {
  const {darkMode} = useTheme();
  return (
    <StatusBar
      animated={true}
      backgroundColor={darkMode ? 'black' : '#ffffff'}
      hidden={false}
      barStyle={darkMode ? 'light-content' : 'dark-content'}
    />
  );
};

export default CustomStatusBar;
