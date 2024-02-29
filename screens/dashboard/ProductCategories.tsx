import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Card from '../../components/product/ProductCategoriesCard';
import categoriesJson from '../../categories.json';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchCategories,
  filterCategoriesAction,
} from '../../store/CategorySlice';
import SearchCategories from './SearchCategories';
import {useTheme} from '../../context/ThemeContext';

const ProductCategories = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  // const [categories, setCategories] = useState<any[]>([]);
  // const [filtercategories, setfilterCategories] = useState<any[]>([]);
  const {categories, filterCategories, loading} = useSelector(
    (state: any) => state.category,
  );
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  // const [loading, setLoading] = useState<boolean>(true);

  const handleCategoryPress = (categoryName: string) => {
    navigation.navigate('Products Screen', {categoryName});
  };
  const {darkMode} = useTheme();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <View
      style={[
        styles.mainContainer,
        {backgroundColor: darkMode ? '#101010' : 'white'},
      ]}>
      <SearchCategories darkMode={darkMode} />
      {loading ? (
        <ActivityIndicator size="large" color="#242424" />
      ) : (
        <FlatList
          data={filterCategories.length > 0 ? filterCategories : categories}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleCategoryPress(item)}>
              <Card item={item} darkMode={darkMode} />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatlistContainer}
          numColumns={2}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: '#fff',
  },

  flatlistContainer: {
    padding: 10,
  },
});

export default ProductCategories;
