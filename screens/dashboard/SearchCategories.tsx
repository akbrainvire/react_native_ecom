import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import {useDispatch, useSelector} from 'react-redux';
import {filterCategoriesAction} from '../../store/CategorySlice';
import {TextInput} from 'react-native';
const SearchCategories = ({darkMode}: any) => {
  const {categories, filterCategories, loading} = useSelector(
    (state: any) => state.category,
  );
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (value: any) => {
    setSearchTerm(value);
    dispatch(filterCategoriesAction(value));
    const filteredCategories = categories.filter(
      (category: any) =>
        category.toLowerCase().indexOf(value.toLowerCase()) !== -1,
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: darkMode ? 'black' : '#efefef',
          borderWidth: darkMode ? 1 : 0,
          borderColor: 'white',
        },
      ]}>
      <TouchableOpacity onPress={() => handleSearch(searchTerm)}>
        <Icon
          name="search"
          size={20}
          color={darkMode ? 'white' : '#000'}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: darkMode ? 'black' : '#efefef',
            color: darkMode ? 'white' : 'black',
          },
        ]}
        placeholderTextColor={darkMode ? 'white' : 'grey'}
        placeholder="Search categories..."
        onChangeText={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    // backgroundColor: '#efefef',
    borderRadius: 50,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    width: '90%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 50,
    paddingHorizontal: 5,
    // backgroundColor: '#efefef',
  },
});
export default SearchCategories;
