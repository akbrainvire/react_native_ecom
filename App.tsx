// App.js
import React, {useEffect, useState} from 'react';
import {Provider, useDispatch} from 'react-redux';
import 'react-native-gesture-handler';
import store from './store/store';

import {SafeAreaView, StatusBar, View} from 'react-native';
import NavigationRoute from './components/Navigation/NavigationRoute';
import {notify} from './store/NotificationSlice';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <View style={{flex: 1}}>
          <StatusBar
            animated={true}
            backgroundColor="#ffffff"
            hidden={false}
            barStyle={'dark-content'}
          />
          <NavigationRoute />
        </View>
      </Provider>
    </SafeAreaView>
  );
};

export default App;
