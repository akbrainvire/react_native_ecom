import React, {useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from 'react-native';

const FirstScreenNoLogin = ({navigation}: any) => {
  const goToLoginScreen = () => {
    navigation.navigate('LogSignCarousel', {
      id: 'login',
    });
    // navigation.navigate('Login', {
    //   id: 'login',
    // });
  };

  const goToSignupScreen = () => {
    navigation.navigate('LogSignCarousel', {
      id: 'signup',
    });
    // navigation.navigate('Signup', {
    //   id: 'signup',
    // });
  };
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      delay: 1000,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const backGroundImages = [
    {
      image: require('../assets/m5.jpg'),
    },
    {
      image: require('../assets/m1.jpg'),
    },
    {
      image: require('../assets/m2.jpg'),
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex: any) => (prevIndex + 1) % backGroundImages.length,
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      {/* <StatusBar
        animated={true}
        backgroundColor={'black'}
        hidden={false}
        barStyle={'light-content'}
      /> */}
      <ImageBackground
        source={backGroundImages[currentImageIndex].image}
        style={styles.backgroundImage}>
        <View style={styles.overlay} />
        <Animated.View style={[styles.logomodelcontainer, {opacity: fadeAnim}]}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logoModel}
          />
        </Animated.View>
        <Animated.View style={[styles.contentContainer, {opacity: fadeAnim}]}>
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
        </Animated.View>
      </ImageBackground>
    </View>
  );
};

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.315)', // Adjust the alpha value for the desired transparency
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
    top: height * 0.35,
    left: width * 0.28,
    // borderWidth: 1,
    // borderColor: 'white',
    paddingVertical: 10,
    // borderRadius: 10,
    paddingHorizontal: 10,
    // backgroundColor: colors.elementBackground,
  },
  logoModel: {
    height: height * 0.15,
    width: width * 0.45,
  },
});

export default FirstScreenNoLogin;
