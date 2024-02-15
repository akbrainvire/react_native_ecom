import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

interface HeaderBackButtonProps {
  navigation: any;
}

const HeaderBackButton: React.FC<HeaderBackButtonProps> = ({navigation}) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, {marginVertical: 10}]}>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon
            name="arrow-back-circle"
            size={45}
            color="#000"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  backButton: {
    marginRight: 'auto',
  },

  icon: {
    // marginHorizontal: 20,
  },
});

export default HeaderBackButton;
