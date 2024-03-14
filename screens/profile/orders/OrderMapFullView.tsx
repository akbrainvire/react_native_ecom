import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import {useTheme} from '../../../context/ThemeContext';
import {Button, Image} from 'react-native-elements';
import {getDistance} from 'geolib';

const OrderMapFullView = ({route}: any) => {
  const {darkMode, colors} = useTheme();
  const {region, address, orderInfo} = route.params;
  const [distance, setDistance] = useState(0);
  console.log(address, 'address');

  const calculateDistance = () => {
    console.log(orderInfo.orderPlacedLocation, region);
    const calculatedDistance = getDistance(
      {
        latitude: orderInfo.orderPlacedLocation.latitude,
        longitude: orderInfo.orderPlacedLocation.longitude,
      },
      {latitude: region.latitude, longitude: region.longitude},
    );
    setDistance(calculatedDistance);
  };

  useEffect(() => {
    calculateDistance();
  }, []);

  // const CustomDistanceShow = () => {
  //   return (

  //   <View style={styles.testContainer}>
  //     <Text>Hello there</Text>
  //   </View>)
  // }

  return (
    <View
      style={[
        styles.mainContainer,
        {backgroundColor: darkMode ? colors.black : colors.white},
      ]}>
      <View style={styles.container}>
        <MapView
          liteMode={false}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          loadingEnabled={true}
          //   zoomEnabled={false}
          //   scrollEnabled={false}
          //   showsScale={false}
          //   showsTraffic={false}
          mapType="standard"
          region={region}>
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title={address.city.name}
            description={'Delivery Location'}>
            {/* <Image
                source={require('../../../assets/logo/location.png')}
                style={{width: 40, height: 40}}
                /> */}
          </Marker>
          <Marker
            coordinate={{
              latitude: orderInfo.orderPlacedLocation.latitude,
              longitude: orderInfo.orderPlacedLocation.longitude,
            }}
            title={'Current location'}
            description={'Orders current location'}>
            {/* <View style={{height: 200, width: 200}}> */}
            <Image
              source={require('../../../assets/logo/deliveryman.png')}
              style={{width: 50, height: 50}}
              resizeMode="contain"
            />
            {/* </View> */}
          </Marker>

          <Polyline
            coordinates={[
              {
                latitude: region.latitude,
                longitude: region.longitude,
              },
              {
                latitude: orderInfo.orderPlacedLocation.latitude,
                longitude: orderInfo.orderPlacedLocation.longitude,
              },
            ]}
            strokeColor="#000"
            strokeColors={['#7F0000']}
            strokeWidth={4}
            tappable={true}
            geodesic={true}></Polyline>
          <Marker
            coordinate={{
              latitude:
                (region.latitude + orderInfo.orderPlacedLocation.latitude) / 2,
              longitude:
                (region.longitude +
                  orderInfo.orderPlacedLocation.longitude -
                  0.6) /
                2,
            }}>
            <View style={styles.testContainer}>
              <Text
                style={{color: 'black', letterSpacing: 5, fontWeight: 'bold'}}>
                {distance ? `${distance / 1000} KM` : 'Calculating...'}
              </Text>
            </View>
          </Marker>
        </MapView>
      </View>

      {/* <View style={styles.distanceContainer}>
        <Text>
          Distance between markers:{' '}
          {distance ? `${distance / 1000} KM` : 'Calculating...'}
        </Text>
        <Button title="Calculate Distance" onPress={calculateDistance} />
      </View> */}
    </View>
  );
};

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    // height: height * 0.91,
    flex: 1,

    // width: 400,
    // marginVertical: 20,
    // marginHorizontal: 20,
  },
  iconContainer: {
    borderRadius: 50,
    padding: 8,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  distanceContainer: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  testContainer: {
    // position: 'absolute',
    // bottom: 20,
    backgroundColor: 'white',
    // padding: 10,
    // borderRadius: 10,
  },
});

export default OrderMapFullView;
