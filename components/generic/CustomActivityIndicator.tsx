import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {useTheme} from '../../context/ThemeContext';

const CustomActivityIndicator = ({animating}: {animating?: boolean}) => {
  const {darkMode} = useTheme();
  return (
    <ActivityIndicator
      animating={animating}
      size="large"
      color={darkMode ? 'white' : '#242424'}
      style={{marginTop: 'auto', marginBottom: 'auto'}}
    />
  );
};

export default CustomActivityIndicator;
