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
      {/* <Text style={styles.title}>Color</Text> */}
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
              <Icon name="checkmark-circle-outline" size={16} color="#ffffff" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    position: 'absolute',
    right: 5,
    top: -25,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  colorContainer: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  colorOption: {
    width: 20,
    height: 20,
    borderRadius: 20,
    marginBottom: 8,
  },
  selectedColor: {
    borderWidth: 2, // Example border for selected color
    borderColor: '#ffffff',
  },
});

export default ColorSelect;
