import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useTheme} from '../../../context/ThemeContext';
import {Image} from 'react-native-elements';

const OrderMapFullView = ({route}: any) => {
  const {darkMode, colors} = useTheme();
  const {region, address} = route.params;
  return (
    <View
      style={[
        styles.mainContainer,
        {backgroundColor: darkMode ? colors.black : colors.white},
      ]}>
      <View style={styles.container}>
        <MapView
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
    height: height * 0.91,

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
});

export default OrderMapFullView;
