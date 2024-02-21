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
  border,
  disabled = false,
}: any) => {
  const styles = StyleSheet.create({
    button: {
      width: width ? width : 'auto',
      color: 'white',
      backgroundColor: disabled ? '#838383' : color,
      padding: 10,
      borderWidth: 1,
      borderColor: '#eaeaea',
      marginVertical: 10,
      borderStyle: border ? border : 'solid',
      borderRadius: 20,
    },

    buttonstyle: {
      display: 'flex',
      justifyContent: logoComp ? 'space-between' : 'center',
      paddingHorizontal: logoComp ? 20 : null,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
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
        {logo && <Icon name={logo} size={20} color={textcolor} />}
        <Text style={styles.textstyle}>{text}</Text>
        {logoComp && LogoComponent && <LogoComponent />}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButtonComponent;
