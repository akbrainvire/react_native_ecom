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
}: any) => {
  const styles = StyleSheet.create({
    button: {
      width: width ? width : 'auto',
      color: 'white',
      backgroundColor: color,
      padding: 10,
      borderWidth: 1,
      borderColor: '#eaeaea',
      marginVertical: 10,
      borderRadius: 20,
    },

    buttonstyle: {
      display: 'flex',
      justifyContent: logoComp ? 'space-between' : 'center',
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
    <TouchableOpacity style={styles.button} onPress={onSubmit}>
      <View style={styles.buttonstyle}>
        {logo && <Icon name={logo} size={20} color={textcolor} />}
        <Text style={styles.textstyle}>{text}</Text>
        {logoComp && LogoComponent && <LogoComponent />}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButtonComponent;
