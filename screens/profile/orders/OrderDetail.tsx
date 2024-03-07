import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from '../../../context/ThemeContext';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HorizontalLineWithText from '../../../components/generic/HorizontalLinewithText';
import CustomButtonComponent from '../../../components/generic/CustomButtonComponent';
import {TouchableOpacity} from 'react-native-gesture-handler';

const OrderDetail = ({navigation, route}: any) => {
  console.log(route.params.item, 'item');

  const ODate = new Date(route.params.item.orderDate);

  const orderDate =
    ODate.getDate() +
    ' ' +
    ODate.toLocaleString('default', {month: 'long'}) +
    ' ' +
    ODate.getFullYear();

  let uptoDate = '';

  function checkforDate(orderDate: any) {
    const currentDate = new Date();

    const orderDateObj = new Date(ODate);

    orderDateObj.setDate(orderDateObj.getDate() + 2);

    uptoDate =
      orderDateObj.getDate() +
      ' ' +
      orderDateObj.toLocaleString('default', {month: 'long'}) +
      ' ' +
      orderDateObj.getFullYear();
    return currentDate.getTime() > orderDateObj.getTime();
  }

  const isMoreThanTwoDaysLater = checkforDate(orderDate);
  console.log(isMoreThanTwoDaysLater);
  const {darkMode, colors} = useTheme();

  const address = route.params.item.address;
  const handleGetRegion = () => {
    if (address.city.toLowerCase() === 'bhopal') {
      return {
        latitude: 23.259933,
        longitude: 77.412613,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      };
    } else if (address.city.toLowerCase() === 'los angeles') {
      return {
        longitude: -118.29282466216695,
        latitude: 34.10557397560494,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      };
    } else if (address.city.toLowerCase() === 'mumbai') {
      return {
        longitude: 72.87155525913757,
        latitude: 19.074390352431653,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      };
    }
  };

  const handleChangePickupAddress = () => {};

  const handleMapFullView = () => {
    navigation.navigate('OrderMapFullView', {
      region: handleGetRegion(),
      address: address,
    });
  };
  return (
    <View
      style={[
        styles.mainContainer,
        {backgroundColor: darkMode ? colors.black : colors.white},
      ]}>
      <View>
        <Text
          style={{
            fontSize: 18,
            color: darkMode ? colors.white : colors.black,
            fontWeight: 'bold',
          }}>
          Order id : {route.params.item.orderId.toUpperCase()}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: darkMode ? colors.grey : colors.grey,
            // fontWeight: 'bold',
          }}>
          {`${address.city} - ${address.state}`}
        </Text>
      </View>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          onPress={handleMapFullView}
          style={styles.map}
          loadingEnabled={true}
          zoomEnabled={false}
          scrollEnabled={false}
          showsScale={false}
          showsTraffic={false}
          mapType="standard"
          region={handleGetRegion()}>
          <Marker
            coordinate={{
              latitude: handleGetRegion()?.latitude || 0,
              longitude: handleGetRegion()?.longitude || 0,
            }}
            title={address.city}
            description={'Delivery Location'}
          />
        </MapView>
      </View>
      <View style={styles.sectionContainer}>
        <View>
          <Text
            style={{
              fontSize: 18,
              color: darkMode ? colors.white : colors.black,
              fontWeight: 'bold',
            }}>
            Collection Point
          </Text>
          <Text
            numberOfLines={2}
            style={{
              fontSize: 14,
              color: darkMode ? colors.grey : colors.grey,
              // fontWeight: 'bold',
            }}>
            {`${address.houseNo},${address.area},${address.city},${address.pincode},${address.state}`}
          </Text>
        </View>
        <View
          style={[
            styles.iconContainer,
            {backgroundColor: darkMode ? colors.white : colors.black},
          ]}>
          <Icon
            name="location-arrow"
            size={18}
            color={darkMode ? 'black' : '#ffffff'}
            style={{transform: [{rotate: '260deg'}]}}
          />
        </View>
      </View>
      <HorizontalLineWithText color="#d8d8d8" />

      {!isMoreThanTwoDaysLater && (
        <View style={styles.changePickContainer}>
          <View style={{flex: 1}}>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 14,
                color: darkMode ? colors.grey : colors.grey,
                // fontWeight: 'bold',
              }}>
              {`You can change pick-up location time for your order by ${uptoDate} `}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleChangePickupAddress}
            style={[
              styles.button,
              {backgroundColor: darkMode ? colors.white : colors.black},
            ]}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 12,
                color: darkMode ? colors.black : colors.white,
              }}>
              Change
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  container: {
    height: 150,
    // width: 400,
    marginVertical: 20,
    // marginHorizontal: 20,
  },
  iconContainer: {
    borderRadius: 50,
    padding: 8,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  changePickContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
  },
  button: {
    padding: 7,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default OrderDetail;
