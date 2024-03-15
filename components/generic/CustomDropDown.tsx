import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
const CustomDropdown = ({
  options,
  placeholder,
  onSelect,
  disabled,
  value,
}: {
  options: any;
  placeholder: any;
  onSelect: any;
  disabled: boolean;
  value: string;
}) => {
  const {darkMode, colors} = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(prevState => !prevState);
  };

  const handleSelectOption = (option: any) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <View style={[{backgroundColor: darkMode ? colors.black : colors.white}]}>
      <TouchableOpacity
        style={[
          styles.dropdownButton,
          {backgroundColor: darkMode ? colors.black : colors.white},
        ]}
        disabled={disabled}
        onPress={toggleDropdown}>
        <Text
          style={[
            styles.selectedOption,
            {
              color: darkMode
                ? colors.white
                : value
                ? colors.black
                : colors.grey,
            },
          ]}>
          {value || placeholder}
        </Text>
      </TouchableOpacity>
      {isOpen && (
        <View
          style={[
            styles.optionsContainer,
            {backgroundColor: darkMode ? colors.black : colors.white},
          ]}>
          <ScrollView>
            {options.map((item: any) => (
              <TouchableOpacity
                onPress={() => handleSelectOption(item)}
                key={item.name}>
                <Text
                  style={[
                    styles.option,
                    {color: darkMode ? colors.white : colors.black},
                  ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
            {options.length < 1 && (
              <Text
                style={[
                  styles.option,
                  {color: darkMode ? colors.white : colors.black},
                ]}>
                No Option Available
              </Text>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  dropdownButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    minWidth: 150,
    backgroundColor: 'white',
  },
  selectedOption: {
    color: '#333',
  },
  optionsContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white',
    maxHeight: 200,
    zIndex: 1000,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default CustomDropdown;
