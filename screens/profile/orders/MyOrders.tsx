import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Image} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {useTheme} from '../../../context/ThemeContext';

const MyOrders = ({navigation}: any) => {
  const [tab, setTab] = useState('ongoing');
  const orders = useSelector((state: any) => state.orders.orders);

  const {darkMode} = useTheme();

  const navigateToOrderDetail = (item: any) => {
    navigation.navigate('Order Detail', {item: item});
  };

  const renderItem = ({item}: {item: any}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigateToOrderDetail(item)}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: darkMode ? 'black' : 'white',
            borderWidth: darkMode ? 1 : 0,
            borderColor: darkMode ? 'white' : 'black',
          },
        ]}>
        <View style={styles.thumbnailContainer}>
          <Image source={{uri: item.thumbnail}} style={styles.thumbnail} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={[styles.name, {color: darkMode ? 'white' : 'black'}]}>
            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </Text>
          <Text
            style={[
              styles.textporderDetail,
              {color: darkMode ? 'white' : 'black'},
            ]}
            numberOfLines={1}>
            Quantity: {item.quantity}
          </Text>
          <Text
            style={[
              styles.textporderDetail,
              {color: darkMode ? 'white' : 'black'},
            ]}>
            {item.brand}
          </Text>
          <Text
            style={[
              styles.textporderDetail,
              {color: darkMode ? 'white' : 'black'},
            ]}>
            Size: {item.size}
          </Text>
          <Text
            style={[
              styles.textporderDetail,
              {color: darkMode ? 'white' : 'black'},
            ]}>
            Color: {item.color}
          </Text>
        </View>
        <Text
          style={[styles.totalPrice, {color: darkMode ? 'white' : 'black'}]}>
          ${item.totalPrice}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.mainContainer,
        {backgroundColor: darkMode ? 'black' : 'white'},
      ]}>
      <View style={styles.header}>
        <View style={styles.headerHeading}>
          <Text
            style={[
              styles.headerHeadingText,
              {color: darkMode ? 'white' : 'black'},
            ]}>
            My Orders
          </Text>
        </View>
        <View style={styles.headertabOptions}>
          <Text
            style={[
              styles.tab,
              tab === 'ongoing'
                ? {color: darkMode ? 'white' : 'black'}
                : {color: '#929292'},
            ]}
            onPress={() => setTab('ongoing')}>
            Ongoing
          </Text>
          <Text
            style={[
              styles.tab,
              tab === 'completed'
                ? {color: darkMode ? 'white' : 'black'}
                : {color: '#929292'},
            ]}
            onPress={() => setTab('completed')}>
            Completed
          </Text>
        </View>
      </View>
      {orders.length > 0 ? (
        <FlatList
          // data={orders.filter((order: any) => tab === 'ongoing' ? order.status === 'ongoing' : order.status === 'completed')}
          data={orders}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.noProducts}>No items available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  tab: {
    fontSize: 16,
    // color: '#929292',
    borderColor: '#929292',
    borderWidth: 1,
    borderRadius: 10,
    padding: 4,
    paddingHorizontal: 10,
  },

  textporderDetail: {
    fontSize: 12,
    color: '#9f9f9f',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 15,
    marginHorizontal: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerHeading: {
    // paddingHorizontal: 10,
  },
  headerHeadingText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  headertabOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  thumbnailContainer: {
    marginRight: 15,
  },
  thumbnail: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 1,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
    alignSelf: 'center',
  },
  noProducts: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',

    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default MyOrders;
