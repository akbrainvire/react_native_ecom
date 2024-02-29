import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import productsJson from '../../products.json';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderBackButton from '../../components/generic/HeaderBackButton';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProductsReq} from '../../sagas/productSaga';
import CustomActivityIndicator from '../../components/generic/CustomActivityIndicator';
import {useTheme} from '../../context/ThemeContext';

const ProductsScreen = ({route}: any) => {
  const {categoryName} = route.params;
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [searchExpanded, setSearchExpanded] = useState<boolean>(false);
  const navigation = useNavigation<any>();
  const [filteredProducts, setFilteredProducts] = useState([]);
  // const [categoryProducts, setCategoryProducts] = useState<any[]>([]);
  const {darkMode} = useTheme();

  const {categoryProducts, loading} = useSelector(
    (state: any) => state.products,
  );
  const dispatch = useDispatch();
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    // try {
    //   fetch(`https://dummyjson.com/products/category/${categoryName}`)
    //     .then(res => res.json())
    //     .then(resdata => setCategoryProducts(resdata.products))
    //     .then(() => setLoading(false));
    // } catch {
    //   console.log('error');
    //   setLoading(false);
    // }

    dispatch(fetchProductsReq({categoryName}));
  }, [dispatch, categoryName]);

  useEffect(() => {
    if (searchTerm !== '') {
      // console.log('enter', categoryProducts);
      const filteredCategories = categoryProducts.filter(
        (item: any) =>
          item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1,
      );
      setFilteredProducts(filteredCategories);
    }
  }, [searchTerm]);

  const handleCategoryPress = (item: string) => {
    console.log(item);
    navigation.navigate('Product Detail', {item});
  };

  const toggleSearchExpanded = () => {
    setSearchExpanded(!searchExpanded);

    if (searchTerm !== '') {
      setSearchExpanded(true);
      Keyboard.dismiss();
    }
    if (searchExpanded == false) {
      Keyboard.dismiss();
    }
  };

  // console.log(categoryProducts);

  return (
    <View
      style={[
        styles.mainContainer,
        {backgroundColor: darkMode ? 'black' : 'white'},
      ]}>
      <View style={styles.headerContainer}>
        <HeaderBackButton />
        <View
          style={[
            styles.searchContainer,
            {
              width: searchExpanded ? 300 : 47,
              borderWidth: searchExpanded ? 1 : 0,
              borderColor: 'white',
            },
          ]}>
          <TouchableOpacity onPress={() => toggleSearchExpanded()}>
            <Icon
              name="search-circle"
              size={45}
              color={darkMode ? 'white' : '#000'}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TextInput
            style={[
              styles.input,
              {
                color: darkMode ? 'white' : 'black',
                backgroundColor: darkMode ? 'black' : 'white',
              },
            ]}
            placeholder="Search product..."
            onChangeText={handleSearch}
            placeholderTextColor={darkMode ? 'white' : 'black'}
          />
        </View>
      </View>
      {loading ? (
        <CustomActivityIndicator />
      ) : (
        <View
          style={[
            styles.container,
            {backgroundColor: darkMode ? 'black' : 'white'},
          ]}>
          <Text
            style={[
              styles.categoryName,
              {color: darkMode ? 'white' : 'black'},
            ]}>
            {categoryName.toUpperCase()}
          </Text>

          <FlatList
            data={searchTerm !== '' ? filteredProducts : categoryProducts}
            numColumns={2}
            renderItem={({item}) => (
              <View style={styles.productContainer}>
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleCategoryPress(item)}>
                  <Image
                    source={{uri: item.thumbnail}}
                    style={styles.thumbnail}
                    onError={() => console.log('Failed to load image')}
                  />
                  <View style={styles.productInfo}>
                    <Text
                      style={[
                        styles.name,
                        {color: darkMode ? 'white' : 'black'},
                      ]}>
                      {item.title}
                    </Text>
                    <Text
                      style={[
                        styles.title,
                        {color: darkMode ? 'white' : 'black'},
                      ]}>
                      {item.brand}
                    </Text>
                    <Text
                      style={[
                        styles.price,
                        {color: darkMode ? 'white' : 'black'},
                      ]}>
                      Price: ${item.price}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
};

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: '#fff',
    // paddingVertical: 20,
  },
  searchContainer: {
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: '#000',
    borderRadius: 50,
    marginRight: 5,
    overflow: 'hidden',
    width: 50,
    // paddingHorizontal: 10,
    // marginHorizontal: 20,
    // marginVertical: 10,
  },
  icon: {
    // marginRight: 5,
    // paddingLeft: 10,
  },
  input: {
    flex: 1,
    height: 35,
    borderRadius: 50,

    paddingHorizontal: 5,
    // backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    width: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingBottom: 30,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  productContainer: {
    flexDirection: 'column',
    padding: 10,
    marginLeft: 10,
    marginVertical: 5,
    width: width / 2.15,
  },

  thumbnail: {
    width: 'auto',
    height: 170,
    borderWidth: 1,
    borderColor: '#eaeaea',
    borderRadius: 20,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    // color: '#000',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  name: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 12,
    textAlign: 'center',
  },
  description: {
    marginBottom: 5,
    textAlign: 'center',
  },
  price: {
    fontWeight: 'bold',
    // color: 'black',
    textAlign: 'center',
  },
});

export default ProductsScreen;
