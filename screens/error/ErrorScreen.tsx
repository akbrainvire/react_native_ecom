import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ErrorScreen = ({route}: any) => {
  return (
    <View style={styles.container}>
      <Icon name="error-outline" size={100} color="#FF5722" />
      <Text style={styles.message}>
        {route.params.message
          ? route.params.message
          : 'Error ! please try again later'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
});

export default ErrorScreen;
