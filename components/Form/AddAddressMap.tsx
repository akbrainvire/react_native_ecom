import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
// import GeoLocation from 'react-native-geolocation-service';

import {useTheme} from '../../context/ThemeContext';

const AddAddressMap = ({route}: any) => {
  const {darkMode, colors} = useTheme();
  // const {region, address, orderInfo} = route.params;
  const [region, setRegion] = useState({
    latitude: 10,
    longitude: 30,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });
  // console.log(GeoLocation.getCurrentPosition(info => info));

  // useEffect(() => {
  //   GeoLocation.getCurrentPosition(
  //     (position: any) => {
  //       console.log(position);
  //     },
  //     (error: any) => {
  //       // See error code charts below.
  //       console.log(error.code, error.message);
  //     },
  //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //   );
  // }, []);

  const handleDrag = (e: any) => {
    console.log(e.nativeEvent, 'coordinates');
    setRegion(e.nativeEvent.coordinate);
  };

  useEffect(() => {
    handleGetAddress(region.latitude, region.longitude);
  }, [region]);

  const handleGetAddress = async (lat: any, lang: any) => {
    const resp = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lang}&key=AIzaSyCkn15ZlylnK59_OoCExGHymWpozd6OcYg`,
    );
    // const data = resp.json();
    console.log(resp, 'response');
  };
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
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          showsCompass={true}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}
          //   zoomEnabled={false}
          //   scrollEnabled={false}
          //   showsScale={false}
          //   showsTraffic={false}
          mapType="standard"
          // region={{
          //   latitude: 10,
          //   longitude: 30,
          //   latitudeDelta: 0,
          //   longitudeDelta: 0,
          // }}
        >
          {/* <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title={'Selected location'}
            description={'Delivery Location'}
            draggable={true}
            onDragEnd={e => handleDrag(e)}></Marker> */}
        </MapView>
      </View>
    </View>
  );
};

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
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

export default AddAddressMap;
