import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

const FirstScreenNoLogin = ({navigation}: any) => {
  const goToLoginScreen = () => {
    navigation.navigate('Login', {
      id: 'login',
    });
  };

  const goToSignupScreen = () => {
    navigation.navigate('Signup', {
      id: 'signup',
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/m1.jpg')}
        style={styles.backgroundImage}>
        <View style={styles.overlay} />
        <View style={styles.logomodelcontainer}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logoModel}
          />
        </View>
        <View style={styles.contentContainer}>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={goToLoginScreen}>
            <Text style={styles.buttonTextLogin}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSignup}
            onPress={goToSignupScreen}>
            <Text style={styles.buttonTextSignup}>Signup</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.473)', // Adjust the alpha value for the desired transparency
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    justifyContent: 'flex-end',
    flex: 1,
  },
  buttonLogin: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 15,
  },
  buttonSignup: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    marginTop: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'white', // Border color
  },
  buttonTextLogin: {
    fontWeight: '800',

    textAlign: 'center',
    fontSize: 16,
    color: 'black',
  },
  buttonTextSignup: {
    fontWeight: '800',

    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
  logomodelcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 300,
    left: 85,
    // borderWidth: 1,
    // borderColor: 'white',
    paddingVertical: 10,
    // borderRadius: 10,
    paddingHorizontal: 10,
    // backgroundColor: colors.elementBackground,
  },
  logoModel: {
    height: 150,
    width: 200,
  },
});

export default FirstScreenNoLogin;