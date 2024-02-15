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

const ProductsScreen = ({route}: any) => {
  const {categoryName} = route.params;
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(true);
  const [allProducts, setAllProducts] = useState<any[]>([
    ...productsJson.products,
  ]);
  const [searchExpanded, setSearchExpanded] = useState<boolean>(false);
  const navigation = useNavigation<any>();

  const [categoryProducts, setCategoryProducts] = useState<any[]>([]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    try {
      if (searchTerm !== '') {
        // console.log('enter', categoryProducts);
        const filteredCategories = categoryProducts.filter(
          item =>
            item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1,
        );
        setCategoryProducts(filteredCategories);
      } else {
        const filteredProducts = allProducts.filter(
          product => product.category === categoryName,
        );

        setCategoryProducts(filteredProducts);
      }
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.log('Error:', error);
    }
  }, [categoryName, allProducts, searchTerm]);

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

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <HeaderBackButton navigation={navigation} />
        <View
          style={[
            styles.searchContainer,
            {
              width: searchExpanded ? 300 : 47,
              borderWidth: searchExpanded ? 1 : 0,
            },
          ]}>
          <TouchableOpacity onPress={() => toggleSearchExpanded()}>
            <Icon
              name="search-circle"
              size={45}
              color="#000"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Search product..."
            onChangeText={handleSearch}
          />
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <View style={styles.container}>
          <Text style={styles.categoryName}>{categoryName.toUpperCase()}</Text>

          <FlatList
            data={categoryProducts}
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
                    <Text style={styles.name}>{item.title}</Text>
                    <Text style={styles.title}>{item.brand}</Text>
                    <Text style={styles.price}>Price: ${item.price}</Text>
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
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  searchContainer: {
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
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
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    color: '#000',
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
    color: 'black',
    textAlign: 'center',
  },
});

export default ProductsScreen;
