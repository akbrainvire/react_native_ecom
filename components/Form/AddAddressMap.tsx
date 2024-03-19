import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useTheme} from '../../context/ThemeContext';

const AddAddressMap = ({navigation, route}: any) => {
  const {darkMode, colors} = useTheme();
  const [region, setRegion] = useState({
    latitude: 10,
    longitude: 30,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  const handleDrag = (e: any) => {
    setRegion({
      ...e.nativeEvent.coordinate,
      longitudeDelta: 0,
      latitudeDelta: 0,
    });
  };

  const handleSaveLocation = () => {
    // console.log('Location saved:', region);
    navigation.navigate('NewAddressForm', {addressDetails2: region});
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
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          showsCompass={true}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}
          mapType="standard"
          region={{
            latitude: 10,
            longitude: 30,
            latitudeDelta: 0,
            longitudeDelta: 0,
          }}>
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title={'Selected location'}
            description={'Delivery Location'}
            draggable={true}
            onDragEnd={handleDrag}
          />
        </MapView>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSaveLocation}>
        <Text style={styles.buttonText}>Save Location</Text>
      </TouchableOpacity>
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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    backgroundColor: '#000', // Example background color
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddAddressMap;
