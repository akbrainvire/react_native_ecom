import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileOptions = ({options, navigation, darkMode}: any) => {
  return (
    <View
      style={[
        styles.mainContainer,
        {backgroundColor: darkMode ? 'black' : 'white'},
      ]}>
      {options.map((item: any) => (
        <TouchableOpacity
          key={item.id}
          style={styles.optionContainer}
          onPress={() => navigation.navigate(item.route)}>
          <View style={styles.logoContainer}>
            <Icon name={item.logo} size={20} color="#000" style={styles.logo} />
          </View>
          <Text
            style={[styles.optionName, {color: darkMode ? 'white' : 'black'}]}>
            {item.name}
          </Text>
          <Icon
            name="angle-right"
            size={20}
            color={darkMode ? 'white' : 'black'}
            style={styles.icon}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#646464',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  logoContainer: {
    width: 30,
    padding: 5,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#e2e2e2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  logo: {},
  optionName: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    paddingVertical: 10,
  },
  icon: {
    marginLeft: 'auto',
  },
});

export default ProfileOptions;
