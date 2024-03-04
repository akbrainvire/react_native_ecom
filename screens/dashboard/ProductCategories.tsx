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
import CustomActivityIndicator from '../../components/generic/CustomActivityIndicator';
import {RefreshControl} from 'react-native';

const ProductCategories = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  // const [categories, setCategories] = useState<any[]>([]);
  // const [filtercategories, setfilterCategories] = useState<any[]>([]);
  const {categories, filterCategories, searchValue, loading} = useSelector(
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

  const onRefresh = () => {
    dispatch(fetchCategories());
  };

  return (
    <View
      style={[
        styles.mainContainer,
        {backgroundColor: darkMode ? '#101010' : 'white'},
      ]}>
      <SearchCategories darkMode={darkMode} />
      {loading ? (
        <CustomActivityIndicator />
      ) : (
        <FlatList
          data={searchValue !== '' ? filterCategories : categories}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleCategoryPress(item)}>
              <Card item={item} darkMode={darkMode} />
            </TouchableOpacity>
          )}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatlistContainer}
          numColumns={2}
          ListEmptyComponent={
            <Text
              style={{
                color: 'grey',
                fontSize: 16,
                marginTop: 'auto',
                marginBottom: 'auto',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              No such product category available
            </Text>
          }
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
