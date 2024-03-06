// App.js
import React, {useEffect, useState} from 'react';
import {Provider, useDispatch} from 'react-redux';
import 'react-native-gesture-handler';
import store from './store/store';

import {
  AppState,
  BackHandler,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import NavigationRoute from './components/Navigation/NavigationRoute';
import {ToastProvider} from 'react-native-toast-notifications';
import {ThemeProvider} from './context/ThemeContext';
import CustomStatusBar from './components/generic/CustomStatusBar';
import persistStore from 'redux-persist/es/persistStore';
import {PersistGate} from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

let persistor = persistStore(store);

const App = () => {
  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });

  const isBiometricSupport = async () => {
    let {available, biometryType} = await rnBiometrics.isSensorAvailable();

    console.log('Biometrics is supported', biometryType, available);
    return available;
  };
  const checkForAppLock = async () => {
    const response = await AsyncStorage.getItem('userOptions');

    const isAuthorized = await AsyncStorage.getItem('isAuthorized');

    if (response !== null && isAuthorized !== null) {
      const data = JSON.parse(response);
      const isAppLock = data.isAppLock;
      const isauthorized = JSON.parse(isAuthorized);
      if (isAppLock && isauthorized) {
        rnBiometrics
          .simplePrompt({promptMessage: 'Unlock the store'})
          .then(resultObject => {
            const {success} = resultObject;

            if (success) {
              console.log('successful biometrics provided');
            } else {
              console.log('user cancelled biometric prompt');
              BackHandler.exitApp();
            }
          })
          .catch(() => {
            console.log('biometrics failed');
          });
      }
    } else {
    }
  };

  useEffect(() => {
    checkForAppLock();
  }, []);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: string) => {
      console.log(nextAppState, 'nextpere');

      if (nextAppState === 'active') {
        const biometricSupport = await isBiometricSupport();
        if (biometricSupport) {
          checkForAppLock();
        }
      }
    };

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.addEventListener('change', handleAppStateChange);
    };
  }, [AppState.currentState]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ThemeProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <ToastProvider
              placement="top"
              duration={5000}
              animationType="slide-in"
              animationDuration={250}
              successColor="green"
              dangerColor="red"
              warningColor="orange"
              normalColor="#000000"
              offset={50}
              offsetTop={30}
              offsetBottom={40}
              swipeEnabled={true}>
              <View style={{flex: 1}}>
                <CustomStatusBar />
                <NavigationRoute />
              </View>
            </ToastProvider>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </SafeAreaView>
  );
};

export default App;
