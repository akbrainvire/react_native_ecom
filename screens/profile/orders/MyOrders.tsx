import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Image} from 'react-native-elements';
import {useSelector} from 'react-redux';

const MyOrders = () => {
  const [tab, setTab] = useState('ongoing');
  const orders = useSelector((state: any) => state.orders.orders);

  const renderItem = ({item}: {item: any}) => (
    <View style={styles.card}>
      <View style={styles.thumbnailContainer}>
        <Image source={{uri: item.thumbnail}} style={styles.thumbnail} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
        <Text style={styles.textporderDetail} numberOfLines={1}>
          Quantity: {item.quantity}
        </Text>
        <Text style={styles.textporderDetail}>{item.brand}</Text>
        <Text style={styles.textporderDetail}>Size: {item.size}</Text>
        <Text style={styles.textporderDetail}>Color: {item.color}</Text>
      </View>
      <Text style={styles.totalPrice}>${item.totalPrice}</Text>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <View style={styles.headerHeading}>
          <Text style={styles.headerHeadingText}>My Orders</Text>
        </View>
        <View style={styles.headertabOptions}>
          <Text
            style={tab === 'ongoing' ? styles.activeTab : styles.tab}
            onPress={() => setTab('ongoing')}>
            Ongoing
          </Text>
          <Text
            style={tab === 'completed' ? styles.activeTab : styles.tab}
            onPress={() => setTab('completed')}>
            Completed
          </Text>
        </View>
      </View>
      <FlatList
        // data={orders.filter((order: any) => tab === 'ongoing' ? order.status === 'ongoing' : order.status === 'completed')}
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
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
    color: '#929292',
    borderColor: '#929292',
    borderWidth: 1,
    borderRadius: 10,
    padding: 4,
    paddingHorizontal: 10,
  },
  activeTab: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    // borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'black',
    paddingHorizontal: 10,
    padding: 4,
  },
  textporderDetail: {
    fontSize: 12,
    color: '#9f9f9f',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
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
  headerHeading: {},
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
});

export default MyOrders;
