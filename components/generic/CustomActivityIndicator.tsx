import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {useTheme} from '../../context/ThemeContext';

const CustomActivityIndicator = () => {
  const {darkMode} = useTheme();
  return (
    <ActivityIndicator size="large" color={darkMode ? 'white' : '#242424'} />
  );
};

export default CustomActivityIndicator;
