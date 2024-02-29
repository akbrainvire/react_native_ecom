import React, {ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {useTheme} from '../../context/ThemeContext';

const CustomHeader = ({
  headerLeft,
  headerRight,
  headerTitle,
}: {
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
  headerTitle?: string;
}) => {
  const {darkMode} = useTheme();
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: darkMode ? 'black' : 'white'},
      ]}>
      <View style={styles.headerLeft}>
        {headerLeft && <View style={styles.headerLeftComp}>{headerLeft}</View>}
        {headerTitle && (
          <Text
            style={[styles.headerTitle, {color: darkMode ? 'white' : 'black'}]}>
            {headerTitle}
          </Text>
        )}
      </View>
      {headerRight && <View style={styles.headerRight}>{headerRight}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //paddingHorizontal: 16, // Adjust padding as needed
    paddingVertical: 10, // Adjust padding as needed
  },
  headerLeft: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 'auto',
  },
  headerLeftComp: {},
  headerRight: {
    // flex: 1,
    marginLeft: 'auto',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
});

export default CustomHeader;
