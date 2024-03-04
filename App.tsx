// App.js
import React, {useEffect, useState} from 'react';
import {Provider, useDispatch} from 'react-redux';
import 'react-native-gesture-handler';
import store from './store/store';

import {SafeAreaView, StatusBar, View} from 'react-native';
import NavigationRoute from './components/Navigation/NavigationRoute';
import {ToastProvider} from 'react-native-toast-notifications';
import {ThemeProvider} from './context/ThemeContext';
import CustomStatusBar from './components/generic/CustomStatusBar';
import persistStore from 'redux-persist/es/persistStore';
import {PersistGate} from 'redux-persist/integration/react';

let persistor = persistStore(store);

const App = () => {
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
