import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'; // Import bottom tab navigator
import {useSelector} from 'react-redux';
import SuccessfulPage from '../../screens/SuccessfulPage';
import FirstScreenNoLogin from '../../screens/FirstScreenNoLogin';
import LoginScreen from '../../screens/LoginScreen';
import SignupScreen from '../../screens/SignupScreen';
import DashboardScreen from '../../screens/dashboard/DashboardScreen';
import HeaderBackButton from '../generic/HeaderBackButton';
import CartScreen from '../../screens/cart/CartScreen';
import NotificationScreen from '../../screens/notification/NotificationScreen';
import ProfileScreen from '../../screens/profile/ProfileScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProductsScreen from '../../screens/dashboard/ProductsScreen';
import ProductDetail from '../../screens/dashboard/ProductDetail';
import AddressScreen from '../../screens/cart/AddressScreen';
import OrderSummaryScreen from '../../screens/cart/OrderSummaryScreen';
import PaymentScreen from '../../screens/cart/PaymentScreen';
import OrderConfirmed from '../../screens/cart/OrderConfirmed';
import PaymentFillDetail from '../../screens/cart/PaymentFillDetail';
import AddNewCard from '../../components/cart/AddNewCard';

const NavigationRoute = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator(); // Create bottom tab navigator
  const isAuthorized = useSelector(
    (state: any) => state.autheticate.isAuthorized,
  );

  const notification = useSelector((state: any) => state.notification.count);
  // Stack navigator for authentication flow
  const AuthStack = () => (
    <Stack.Navigator initialRouteName="FirstScreenNoLogin">
      <Stack.Screen
        name="SuccessfulPage"
        component={SuccessfulPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FirstScreenNoLogin"
        component={FirstScreenNoLogin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={({navigation, route}) => ({
          headerLeft: props => <HeaderBackButton />,
          headerShown: true,
        })}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={({navigation, route}) => ({
          headerLeft: props => <HeaderBackButton />,
          headerShown: true,
        })}
      />
    </Stack.Navigator>
  );

  // Stack navigator for the "Home" tab
  const HomeStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard Screen"
        component={DashboardScreen}
        options={({navigation, route}) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Products Screen"
        component={ProductsScreen}
        options={({navigation, route}) => ({
          headerTitle: '',
          headerBackTitleVisible: false,
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Product Detail"
        component={ProductDetail}
        options={({navigation, route}) => ({
          headerTitle: '',
          headerBackTitleVisible: false,
          headerShown: false,
        })}
      />

      {/* <Stack.Screen name="ProductDetail" component={ProductDetailScreen} /> */}
    </Stack.Navigator>
  );

  // Stack navigator for the "Cart" tab
  const CartStack = () => (
    <Stack.Navigator>
      {/* Add screens for the "Cart" tab */}
      <Stack.Screen
        name="Cart Screen"
        component={CartScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Cart',
        })}
      />
      <Stack.Screen
        name="AddressScreen"
        component={AddressScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Select delivery address',
        })}
      />
      <Stack.Screen
        name="OrderSummary"
        component={OrderSummaryScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Order summary',
        })}
      />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={({navigation, route}) => ({
          headerLeft: props => <HeaderBackButton paddinghorizontal={true} />,
          headerShown: true,
          headerTitle: 'Select Payment Option',
        })}
      />
      <Stack.Screen
        name="AddNewCard"
        component={AddNewCard}
        options={({navigation, route}) => ({
          headerLeft: props => <HeaderBackButton paddinghorizontal={true} />,
          headerShown: true,
          headerTitle: 'Add new card',
        })}
      />
      <Stack.Screen
        name="PaymentFillDetail"
        component={PaymentFillDetail}
        options={({navigation, route}) => ({
          headerLeft: props => <HeaderBackButton paddinghorizontal={true} />,
          headerShown: true,
          headerTitle: '',
        })}
      />
      <Stack.Screen name="OrderConfirmed" component={OrderConfirmed} />
    </Stack.Navigator>
  );

  // Stack navigator for the "Notification" tab
  const NotificationStack = () => (
    <Stack.Navigator>
      {/* Add screens for the "Notification" tab */}
      <Stack.Screen name="Notification Screen" component={NotificationScreen} />
    </Stack.Navigator>
  );

  // Stack navigator for the "Profile" tab
  const ProfileStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Profile Screen" component={ProfileScreen} />
      {/* Add screens for the "Profile" tab */}
    </Stack.Navigator>
  );
  // Bottom tab navigator for authenticated screens
  const TabNavigator = () => (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#b7b7b7',

        tabBarStyle: {
          height: 60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.1,
          shadowRadius: 16.0,
          elevation: 24,
          paddingVertical: 10,
          bottom: 0,
          width: '100%',
          zIndex: 0,
          borderTopWidth: 0,
          backgroundColor: 'white',
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
          ),
          tabBarLabelPosition: 'beside-icon',
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="shopping-cart" size={size} color={color} />
          ),
          tabBarLabelPosition: 'beside-icon',
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationStack}
        options={{
          headerShown: false,
          tabBarBadge: notification > 0 ? notification : undefined,
          tabBarIcon: ({color, size}) => (
            <Icon name="bell-o" size={size} color={color} />
          ),
          tabBarLabelPosition: 'beside-icon',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="user-circle-o" size={size} color={color} />
          ),
          tabBarLabelPosition: 'beside-icon',
        }}
      />
    </Tab.Navigator>
  );

  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        {/* Render either the authentication flow or the main stack */}
        {isAuthorized ? <TabNavigator /> : <AuthStack />}
      </NavigationContainer>
    </View>
  );
};

export default NavigationRoute;