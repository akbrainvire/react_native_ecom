import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const HorizontalLineWithText = ({
  text,
  color,
}: {
  text?: string;
  color?: string;
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.line, {backgroundColor: color ? color : 'grey'}]} />
      {text && <Text style={[styles.text]}>{text}</Text>}
      <View style={[styles.line, {backgroundColor: color ? color : 'grey'}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'grey',
  },
  text: {
    marginHorizontal: 10,
    color: 'grey',
  },
});

export default HorizontalLineWithText;
