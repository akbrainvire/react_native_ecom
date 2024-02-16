import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const StepProgress = ({currentStep}: any) => {
  const steps = ['Address', 'Order Summary', 'Payment'];

  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <View
            style={[
              styles.dot,
              index <= currentStep ? styles.completedDot : null,
            ]}
          />
          {index < steps.length - 1 && (
            <View
              style={[
                styles.line,
                index <= currentStep ? styles.completedLine : null,
              ]}
            />
          )}
          <Text style={styles.stepText}>{step}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  stepContainer: {
    alignItems: 'center',
    marginRight: 20, // Adjust spacing as needed
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'lightgray',
    marginBottom: 5,
    position: 'relative',
  },
  completedDot: {
    backgroundColor: '#3498DB', // Blue
  },
  line: {
    position: 'absolute',
    bottom: 29, // Adjust as needed (between dot and text)
    right: -40, // Adjust as needed (center of dot)
    width: '100%', // Connect dots across the container
    height: 2,
    backgroundColor: 'lightgray',
  },
  completedLine: {
    backgroundColor: '#3498DB', // Blue
  },
  stepText: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 5, // Adjust spacing between dot and text
  },
});

export default StepProgress;
