import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const RadioButtonGroup = ({radioButtons, onPress, selectedId}: any) => {
  return (
    <View style={styles.container}>
      {radioButtons.map((button: any) => (
        <TouchableOpacity
          key={button.id}
          style={[
            styles.radioButton,
            selectedId === button.value ? styles.radiobuttonSelectedBg : null,
          ]}
          onPress={() => onPress(button.value)}>
          <Text
            style={[
              styles.radioButtonLabel,
              selectedId === button.value
                ? styles.radiobuttonSelectedLabel
                : null,
            ]}>
            {button.label}
          </Text>
          <View
            style={[
              styles.radioButtonCircle,
              selectedId === button.value
                ? styles.radiobuttonSelectedCircle
                : null,
            ]}>
            {selectedId === button.value && (
              <View style={[styles.selectedCircle]} />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'flex-start',
  },
  radioButton: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 18,
    paddingHorizontal: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 14,

    // shadowColor: '#d6d6d6',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 2,
    // padding: 10,
  },
  radioButtonLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  radiobuttonSelectedBg: {
    backgroundColor: '#000',
    borderRadius: 14,
  },
  radiobuttonSelectedLabel: {
    color: '#fff',
  },
  radioButtonCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radiobuttonSelectedCircle: {
    borderColor: '#fff',
    color: '#fff',
  },
  selectedCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
});

export default RadioButtonGroup;