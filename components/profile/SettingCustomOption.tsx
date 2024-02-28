import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {Animated} from 'react-native';
import {useToast} from 'react-native-toast-notifications';

const ToggleButton = ({name, toggle, onPress}: any) => {
  //   const toast = useToast();
  //   const [isOn, setIsOn] = useState(false);
  //   const handleToggle = () => {
  //     setIsOn(!isOn);

  //     toast.show(`${name} ${isOn ? 'enabled' : 'disabled'}`, {
  //       type: 'custom',
  //       placement: 'top',
  //       duration: 3000,
  //       animationType: 'slide-in',
  //     });
  //   };

  console.log(toggle, 'toooooooo');

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={[styles.toggleContainerT]}>
        {!toggle ? (
          <Icon2 name="toggle-on" size={45} color="black" />
        ) : (
          <Icon2 name="toggle-off" size={45} color="#c2c2c2" />
        )}
      </View>
      {/* <Text style={styles.text}>{isOn ? 'ON' : 'OFF'}</Text> */}
    </TouchableOpacity>
  );
};

const SettingCustomOption = ({
  logo,
  name,
  isToggle,
  onPress,
  language,
  toggle,
}: any) => {
  const objToSend = {
    language: '',
    darkMode: false,
    notification: false,
  };

  console.log(toggle, 'ttt');
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.logoContainer}>
        <Icon name={logo} size={25} color="black" />
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{name}</Text>
      </View>
      <View style={styles.toggleContainer}>
        {isToggle ? (
          <ToggleButton name={name} toggle={toggle} onPress={onPress} />
        ) : (
          <View style={styles.textContainer}>
            {language && <Text style={styles.languageText}>{language}</Text>}
            <Icon2 name="keyboard-arrow-right" size={24} color="black" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    // borderRadius: 10,
    padding: 10,
    // marginVertical: 5,
    // elevation: 3,
  },
  logoContainer: {
    marginRight: 10,
    backgroundColor: '#dadada',
    borderRadius: 5,
    padding: 5,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameContainer: {
    flex: 1,
    marginRight: 10,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleContainer: {},
  textContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  languageText: {
    color: '#bfbfbf',
    fontSize: 16,
  },

  ///Toggle Button Style
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    // paddingVertical: 5,
    // paddingHorizontal: 10,
    // borderRadius: 20,
  },
  toggleContainerT: {
    flexDirection: 'row',
    // position: 'absolute',
    // left: -20,
    // paddingHorizontal: 5,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default SettingCustomOption;
