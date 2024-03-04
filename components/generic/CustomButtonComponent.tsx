import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomButtonComponent = ({
  text,
  color,
  logo,
  onSubmit,
  textcolor,
  width,
  LogoComponent,
  logoComp,
  size,
  border,
  disabled = false,
  isOnlyLogo,
}: // marginTop,
any) => {
  const styles = StyleSheet.create({
    button: {
      width: width ? width : 'auto',
      color: 'white',
      backgroundColor: disabled ? '#838383' : color,
      padding: isOnlyLogo ? 3 : 10,
      paddingVertical: isOnlyLogo ? 8 : 12,
      borderWidth: 1,
      borderColor: '#c0c0c0',
      marginVertical: 10,
      borderStyle: border ? border : 'solid',
      borderRadius: 30,
    },

    buttonstyle: {
      display: 'flex',
      justifyContent: logoComp ? 'space-between' : 'center',
      paddingHorizontal: logoComp ? 20 : null,
      flexDirection: 'row',
      alignItems: 'center',
      gap: isOnlyLogo ? 0 : 15,
      width: isOnlyLogo ? 80 : 'auto',
      // marginTop: marginTop ? marginTop : null,
    },
    textstyle: {
      color: textcolor,

      fontSize: 16,
      fontWeight: '700',
    },
  });
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onSubmit}
      disabled={disabled}>
      <View style={styles.buttonstyle}>
        {logo && <Icon name={logo} size={size ? size : 20} color={textcolor} />}
        {isOnlyLogo ? '' : <Text style={styles.textstyle}>{text}</Text>}
        {logoComp && LogoComponent && <LogoComponent />}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButtonComponent;
