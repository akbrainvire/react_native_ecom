import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';

const SingleRadioButton = ({
  button,
  darkMode,
  selectedId,
  handleGender,
}: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        key={button.id}
        style={[
          styles.radioButton,
          {
            borderWidth: darkMode ? 1 : 0,
            borderColor: darkMode ? 'white' : 'black',
          },
          // {borderColor: darkMode ? 'black' : 'white'},
          {backgroundColor: darkMode ? 'black' : 'white'},
          selectedId === button.id
            ? {
                backgroundColor: darkMode ? 'white' : 'black',
                borderRadius: 14,
              }
            : null,
        ]}
        onPress={() => handleGender(button.id)}>
        <View
          style={[
            styles.radioButtonCircle,
            {borderColor: darkMode ? 'grey' : 'grey'},
            selectedId === button.id && {
              borderColor: darkMode ? 'black' : 'white',
            },
          ]}>
          {selectedId === button.id && (
            <View
              style={[
                styles.selectedCircle,
                {backgroundColor: darkMode ? 'black' : 'white'},
              ]}
            />
          )}
        </View>
        <View>
          <Text
            style={[
              styles.radioButtonLabel,
              {color: darkMode ? 'grey' : 'grey'},
              selectedId === button.id
                ? {color: darkMode ? 'black' : 'white'}
                : null,
            ]}>
            {button.value}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.3,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingRight: 5,
    // gap: 10,
  },
  radioButton: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 10,
    // marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginVertical: 5,
    borderRadius: 14,

    // backgroundColor: '#fff',
    shadowColor: '#c4c1c1',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
    // padding: 10,
  },
  radioButtonLabel: {
    marginRight: 10,
    fontSize: 14,
  },
  radiobuttonSelectedLabel: {
    // color: '#fff',
  },
  radioButtonCircle: {
    width: 15,
    height: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radiobuttonSelectedCircle: {
    // borderColor: '#fff',
    // color: '#fff',
  },
  selectedCircle: {
    width: 7,
    height: 7,
    borderRadius: 5,
    // backgroundColor: '#ffffff',
  },
  // logoimageContainer: {
  //     width: 50,
  //     height: 'auto',
  // },
  // logoimage: {
  //     objectFit: 'contain',
  //     width: '100%',
  //     height: 40,
  // },
  // logoLabelContainer: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     justifyContent: 'flex-start',
  //     gap: 10,
  // },
});

export default SingleRadioButton;
