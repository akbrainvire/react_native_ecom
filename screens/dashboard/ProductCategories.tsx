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
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../../components/product/ProductCategoriesCard'; // Assuming the path is correct
import categoriesJson from '../../categories.json';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCategories} from '../../store/CategorySlice';

const ProductCategories = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  // const [categories, setCategories] = useState<any[]>([]);
  const [filtercategories, setfilterCategories] = useState<any[]>([]);
  const {categories, loading} = useSelector((state: any) => state.category);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState<boolean>(true);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filteredCategories = categories.filter(
      (category: any) =>
        category.toLowerCase().indexOf(value.toLowerCase()) !== -1,
    );
    setfilterCategories(filteredCategories);
  };

  const handleCategoryPress = (categoryName: string) => {
    navigation.navigate('Products Screen', {categoryName});
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => handleSearch(searchTerm)}>
          <Icon name="search" size={20} color="#000" style={styles.icon} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Search categories..."
          onChangeText={handleSearch}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#242424" />
      ) : (
        <FlatList
          data={filtercategories.length > 0 ? filtercategories : categories}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleCategoryPress(item)}>
              <Card item={item} />
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
    backgroundColor: '#fff',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    borderRadius: 50,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 50,
    paddingHorizontal: 5,
    backgroundColor: '#efefef',
  },
  flatlistContainer: {
    padding: 10,
  },
});

export default ProductCategories;
