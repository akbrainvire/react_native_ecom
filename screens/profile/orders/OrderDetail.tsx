import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {useTheme} from '../../../context/ThemeContext';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HorizontalLineWithText from '../../../components/generic/HorizontalLinewithText';
import CustomButtonComponent from '../../../components/generic/CustomButtonComponent';
import {TouchableOpacity} from 'react-native-gesture-handler';
import OrderStepper from './OrderStepper';
import moment from 'moment';
const {height, width} = Dimensions.get('window');
const OrderDetail = ({navigation, route}: any) => {
  console.log(route.params.item.orderDetails, 'item');

  let uptoDate = route.params.item.orderDetails.orderPlaced.date;

  const orderPlacedDat = moment(uptoDate, 'MMMM D, YYYY');

  const orderPlacedDate = moment(orderPlacedDat);

  console.log(orderPlacedDate.format('LL'));

  const twoDaysLaterDate = moment(orderPlacedDate).add(2, 'days');
  const isLessthanTwoDays = twoDaysLaterDate > orderPlacedDate;

  console.log(twoDaysLaterDate.format());
  console.log(orderPlacedDate > twoDaysLaterDate, 'isMorethanTwoDays');

  const {darkMode, colors} = useTheme();

  const address = route.params.item.address;

  // console.log(address, 'route');

  const handleChangePickupAddress = () => {};

  const orderInfo = route.params.item.orderInfo;

  const handleMapFullView = () => {
    navigation.navigate('OrderMapFullView', {
      region: {
        longitude: parseFloat(address.city.longitude),
        latitude: parseFloat(address.city.latitude),
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
      address: address,
    });
  };
  return (
    <View
      style={[
        styles.mainContainer,
        {backgroundColor: darkMode ? colors.black : colors.white},
      ]}>
      <View style={{height: height * 0.3}}>
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
            {`${address.country.name} - ${address.state.name}`}
          </Text>
        </View>
        <View style={[styles.container]}>
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
            region={{
              longitude: parseFloat(address.city.longitude),
              latitude: parseFloat(address.city.latitude),
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            <Marker
              coordinate={{
                latitude: parseFloat(address.city.latitude),
                longitude: parseFloat(address.city.longitude),
              }}
              title={address.city.name}
              description={'Delivery Location'}>
              {/* <Image
                source={require('../../../assets/logo/location.png')}
                style={{width: 40, height: 40}}
              /> */}
            </Marker>
          </MapView>
        </View>
      </View>
      <View style={{height: isLessthanTwoDays ? height * 0.18 : height * 0.1}}>
        <View style={[styles.sectionContainer]}>
          <View style={{width: width * 0.8}}>
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
              {`${address.houseNo},${address.area},${address.city.name},${address.pincode},${address.state.name}, ${address.country.name}`}
            </Text>
          </View>
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: darkMode ? colors.white : colors.black,
                width: 'auto',
              },
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

        {isLessthanTwoDays && (
          <View style={styles.changePickContainer}>
            <View style={{flex: 1}}>
              <Text
                numberOfLines={2}
                style={{
                  fontSize: 14,
                  color: darkMode ? colors.grey : colors.grey,
                  // fontWeight: 'bold',
                }}>
                {`You can change pick-up location time for your order by ${twoDaysLaterDate.format(
                  'LL',
                )} `}
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
      <View
        style={{
          // flex: 1,
          // justifyContent: 'center',
          // alignItems: 'center',
          // flexDirection: 'row',
          height: height * 0.52,
        }}>
        <OrderStepper
          orderDetails={route.params.item.orderDetails}
          orderInfo={orderInfo}
        />
      </View>
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
    gap: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingVertical: 20,
  },
  changePickContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    // paddingVertical: 20,
  },
  button: {
    padding: 7,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default OrderDetail;
