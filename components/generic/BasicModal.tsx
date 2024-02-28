import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';

const BasicModal = ({
  options,
  onSelect,
  isOpen,
}: {
  options: any;
  onSelect: any;
  isOpen: any;
}) => {
  return (
    <View style={styles.container}>
      <Modal visible={isOpen} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {options.map((option: any, index: any) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => {
                  onSelect(option);
                }}>
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1, // Ensure dropdown is above other elements
  },
  dropdownHeader: {},
  dropdownHeaderText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    minWidth: 200,
    maxWidth: 300,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default BasicModal;
