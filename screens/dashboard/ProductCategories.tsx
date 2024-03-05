import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Card from '../../components/product/ProductCategoriesCard';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCategories} from '../../store/CategorySlice';
import SearchCategories from './SearchCategories';
import {useTheme} from '../../context/ThemeContext';
import CustomActivityIndicator from '../../components/generic/CustomActivityIndicator';
import {RefreshControl} from 'react-native';
import {Animated} from 'react-native';

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
    fade.setValue(0.6);
    triggerAnimation();
  };

  const fade = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    triggerAnimation();
  }, [loading]);

  const triggerAnimation = () => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
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
          // onScroll={Animated.event(
          //   [{nativeEvent: {contentOffset: {y: scrollY}}}],
          //   {useNativeDriver: true},
          // )}
          data={searchValue !== '' ? filterCategories : categories}
          renderItem={({item, index}) => {
            // const inputRange = [-1, 0, 100 * index, 100 * (index + 2)];

            // const scale = scrollY.interpolate({
            //   inputRange,
            //   outputRange: [1, 1, 1, 0],
            // });
            return (
              <Animated.View style={{transform: [{scaleY: fade}]}}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleCategoryPress(item)}>
                  <Card item={item} darkMode={darkMode} />
                </TouchableOpacity>
              </Animated.View>
            );
          }}
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
