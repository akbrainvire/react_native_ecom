import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the Icon component

const ColorSelect = ({colors, onSelectColor}: any) => {
  const [selectedColor, setSelectedColor] = useState('');

  const handleColorSelect = (color: any) => {
    setSelectedColor(color);
    onSelectColor(color);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Color</Text>
      <View style={styles.colorContainer}>
        {colors.map((color: any, index: any) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.colorOption,
              {backgroundColor: color},
              selectedColor === color && styles.selectedColor,
            ]}
            onPress={() => handleColorSelect(color)}>
            {selectedColor === color && (
              <Icon name="checkmark-circle-outline" size={25} color="#ffffff" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  colorContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  colorOption: {
    width: 25,
    height: 25,
    borderRadius: 20,
    marginBottom: 2,
  },
  selectedColor: {
    // borderWidth: 1,
    // borderColor: '#000000',
  },
});

export default ColorSelect;
