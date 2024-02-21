import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileHeaderRight = () => {
  const navigation = useNavigation<any>();

  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleSettingsPress}>
      <Icon name="settings" size={28} color="#000" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 20,
  },
});

export default ProfileHeaderRight;
