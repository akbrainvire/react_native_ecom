import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'; // Import bottom tab navigator
import {useSelector} from 'react-redux';
import SuccessfulPage from '../../screens/default/SuccessfulPage';
import FirstScreenNoLogin from '../../screens/FirstScreenNoLogin';
import LoginScreen from '../../screens/LoginScreen';
import SignupScreen from '../../screens/SignupScreen';
import DashboardScreen from '../../screens/dashboard/DashboardScreen';
import HeaderBackButton from '../generic/HeaderBackButton';
import CartScreen from '../../screens/cart/CartScreen';
import NotificationScreen from '../../screens/notification/NotificationScreen';
import ProfileScreen from '../../screens/profile/ProfileScreen';
import ProductsScreen from '../../screens/dashboard/ProductsScreen';
import ProductDetail from '../../screens/dashboard/ProductDetail';
import AddressScreen from '../../screens/cart/AddressScreen';
import OrderSummaryScreen from '../../screens/cart/OrderSummaryScreen';
import PaymentScreen from '../../screens/cart/PaymentScreen';
import OrderConfirmed from '../../screens/cart/OrderConfirmed';
import PaymentFillDetail from '../../screens/cart/PaymentFillDetail';
import AddNewCard from '../../components/cart/AddNewCard';
import ErrorScreen from '../../screens/error/ErrorScreen';
import ProfileHeaderRight from '../profile/ProfileHeaderRight';
import CartHeaderRight from '../cart/CartHeaderRight';
import PersonalDetails from '../profile/PersonalDetails';
import {CustomTabBar} from './CustomTabBar';
import MyOrders from '../../screens/profile/orders/MyOrders';
import NewAddressForm from '../Form/NewAddressForm';
import MyFavourites from '../../screens/profile/wishlist/MyFavourites';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerView from './CustomDrawerView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Settings from '../../screens/setting/Settings';
import NotificationSetting from '../../screens/setting/NotificationSetting';
import LanguageSetting from '../../screens/setting/LanguageSetting';
import LogSignCarousel from '../../screens/default/LogSignCarousel';
import CustomHeader from '../generic/CustomHeader';
const NavigationRoute = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();
  const isAuthorized = useSelector(
    (state: any) => state.autheticate.isAuthorized,
  );

  const notification = useSelector((state: any) => state.notification.count);
  // const cartItems = useSelector((state: any) => state.cart.cartItemCount);

  //Drawer navigation

  // const AppDrawerStack = () => (
  //   <Drawer.Navigator
  //     drawerContent={props => <CustomDrawerView {...props} />}
  //     screenOptions={{

  //       headerTitle: '',

  //       drawerActiveBackgroundColor: '#000',
  //       drawerInactiveBackgroundColor: '#b7b7b7',
  //     }}>
  //     <Drawer.Screen
  //       name="Home"
  //       component={HomeStack}

  //     />
  //     <Drawer.Screen name="Cart" component={CartStack} />
  //     <Drawer.Screen name="Notification" component={NotificationStack} />
  //     <Drawer.Screen name="Profile" component={ProfileStack} />
  //   </Drawer.Navigator>
  // );

  // Stack navigator for authentication flow
  const AuthStack = () => (
    <Stack.Navigator initialRouteName="FirstScreenNoLogin">
      <Stack.Screen
        name="FirstScreenNoLogin"
        component={FirstScreenNoLogin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={({navigation, route}) => ({
          header: () => <CustomHeader headerLeft={<HeaderBackButton />} />,
          headerShown: true,
        })}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={({navigation, route}) => ({
          header: () => <CustomHeader headerLeft={<HeaderBackButton />} />,
          headerShown: true,
        })}
      />
      <Stack.Screen
        name="LogSignCarousel"
        component={LogSignCarousel}
        options={{
          headerShown: true,
          header: () => (
            <CustomHeader
              headerTitle="Back"
              headerLeft={<HeaderBackButton paddinghorizontal={20} />}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Error Screen"
        component={ErrorScreen}
        options={({navigation, route}) => ({
          header: () => (
            <CustomHeader
              headerTitle="Error"
              headerLeft={<HeaderBackButton paddinghorizontal={20} />}
            />
          ),
        })}
      />
      <Stack.Screen
        name="SuccessfulPage"
        component={SuccessfulPage}
        options={{headerShown: false}}
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
    </Stack.Navigator>
  );

  // Stack navigator for the "Cart" tab
  const CartStack = () => (
    <Stack.Navigator initialRouteName="Cart Screen">
      {/* Add screens for the "Cart" tab */}
      <Stack.Screen
        name="Cart Screen"
        component={CartScreen}
        options={({navigation, route}) => ({
          headerShown: true,
          header: () => (
            <CustomHeader
              headerTitle="Cart"
              headerRight={
                <CartHeaderRight paddingRight={20} color={'#afafaf'} />
              }
            />
          ),
        })}
      />
    </Stack.Navigator>
  );

  // Stack navigator for the "Notification" tab
  const NotificationStack = () => (
    <Stack.Navigator>
      {/* Add screens for the "Notification" tab */}
      <Stack.Screen
        name="Notification Screen"
        component={NotificationScreen}
        options={({navigation, route}) => ({
          headerTitle: '',
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );

  // Stack navigator for the "Profile" tab
  const ProfileStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile Screen"
        component={ProfileScreen}
        options={({navigation, route}) => ({
          header: () => (
            <CustomHeader
              headerLeft={<HeaderBackButton paddinghorizontal={20} />}
              headerRight={<ProfileHeaderRight />}
            />
          ),

          headerShown: true,
        })}
      />

      {/* Add screens for the "Profile" tab */}
    </Stack.Navigator>
  );

  const StackThatWillHaveBottomTab = () => {
    return (
      <Tab.Navigator
        // sceneContainerStyle={{
        //   height: 100,
        //   backgroundColor: 'yel',
        // }}
        // screenOptions={{
        //   tabBarStyle: {
        //     borderTopLeftRadius: 20,
        //     borderTopRightRadius: 20,
        //     height: 60,
        //     borderWidth: 2,
        //     borderColor: 'red',
        //   },
        // }}
        tabBar={props => <CustomTabBar {...props} />}>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartStack}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationStack}
          options={
            {
              // headerShown: false,
              // tabBarBadge: notification > 0 ? notification : undefined,
            }
          }
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    );
  };

  const BottomTabHideStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="TabStack"
        component={StackThatWillHaveBottomTab}
        options={({navigation, route}) => ({
          headerTitle: '',
          headerBackTitleVisible: false,
          headerShown: false,
        })}
      />
      {/* <Stack.Screen
        name="AppDrawer"
        component={AppDrawerStack}
        options={({navigation, route}) => ({
          headerTitle: '',
          headerBackTitleVisible: false,
          headerShown: true,
        })}
      /> */}

      <Stack.Screen
        name="SuccessfulPage"
        component={SuccessfulPage}
        options={{headerShown: false}}
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

      {/* for Cart Stack*/}
      <Stack.Screen
        name="AddressScreen"
        component={AddressScreen}
        options={({navigation, route}) => ({
          header: () => (
            <CustomHeader
              headerTitle="Select delivery address"
              headerLeft={<HeaderBackButton paddinghorizontal={10} />}
            />
          ),
        })}
      />
      <Stack.Screen
        name="NewAddressForm"
        component={NewAddressForm}
        options={({navigation, route}) => ({
          header: () => (
            <CustomHeader
              headerTitle="Enter new delivery address"
              headerLeft={<HeaderBackButton paddinghorizontal={10} />}
            />
          ),
        })}
      />
      <Stack.Screen
        name="OrderSummary"
        component={OrderSummaryScreen}
        options={({navigation, route}) => ({
          header: () => (
            <CustomHeader
              headerTitle="Order summary"
              headerLeft={<HeaderBackButton paddinghorizontal={10} />}
            />
          ),
        })}
      />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={({navigation, route}) => ({
          header: () => (
            <CustomHeader
              headerTitle="Select Payment Option"
              headerLeft={<HeaderBackButton paddinghorizontal={10} />}
            />
          ),
          headerShown: true,
        })}
      />
      <Stack.Screen
        name="AddNewCard"
        component={AddNewCard}
        options={({navigation, route}) => ({
          header: () => (
            <CustomHeader
              headerTitle="Add new card"
              headerLeft={<HeaderBackButton paddinghorizontal={20} />}
            />
          ),
          headerShown: true,
        })}
      />
      <Stack.Screen
        name="PaymentFillDetail"
        component={PaymentFillDetail}
        options={({navigation, route}) => ({
          header: () => (
            <CustomHeader
              headerLeft={<HeaderBackButton paddinghorizontal={20} />}
            />
          ),
          headerShown: true,
          headerTitle: '',
        })}
      />

      <Stack.Screen name="OrderConfirmed" component={OrderConfirmed} />

      {/* <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />*/}

      {/* for Notification Stack*/}

      {/* for Profile Stack*/}

      <Stack.Screen
        name="Personal Details"
        component={PersonalDetails}
        options={({navigation, route}) => ({
          header: () => (
            <CustomHeader
              headerLeft={<HeaderBackButton paddinghorizontal={10} />}
            />
          ),
          headerShown: true,
          headerTitle: '',
        })}
      />
      <Stack.Screen
        name="My Favourites"
        component={MyFavourites}
        options={({navigation, route}) => ({
          header: () => (
            <CustomHeader
              headerTitle="Wishlist"
              headerLeft={<HeaderBackButton paddinghorizontal={20} />}
            />
          ),
        })}
      />
      <Stack.Screen
        name="My Orders"
        component={MyOrders}
        options={({navigation, route}) => ({
          header: () => (
            <CustomHeader
              headerLeft={<HeaderBackButton paddinghorizontal={20} />}
              headerRight={<ProfileHeaderRight />}
            />
          ),

          headerShown: true,
          headerTitle: '',
        })}
      />

      <Stack.Screen
        name="Settings"
        component={SettingTabNavigator}
        options={({navigation, route}) => ({
          // header: () => (
          //   <CustomHeader
          // headerTitle= 'Settings'
          //     headerLeft={<HeaderBackButton paddinghorizontal={20} />}
          //   />
          // ),
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="Error Screen"
        component={ErrorScreen}
        options={({navigation, route}) => ({
          header: () => <CustomHeader headerTitle="Error" />,
        })}
      />

      {/* <Stack.Screen name="Cart" component={CartTabNavigator} /> */}
    </Stack.Navigator>
  );

  //////////////Combination of tab and drawer navigation////////////////////////////////////
  const SettingStackNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Settings"
          component={MainSettingAppDrawer}
          options={({navigation, route}) => ({
            headerShown: false,
            headerTitle: 'Settings',
          })}
        />
      </Stack.Navigator>
    );
  };

  const MainSettingAppDrawer = () => {
    return (
      <Drawer.Navigator
        // drawerContent={props => <CustomDrawerView {...props} />
        // }
        screenOptions={{
          drawerActiveBackgroundColor: 'black',
          drawerInactiveBackgroundColor: 'grey',
          drawerLabelStyle: {
            fontSize: 16,
            color: 'white',
          },
        }}>
        <Drawer.Screen name="Setting" component={Settings} />
        {/* <Drawer.Screen
          name="Notification Setting"
          component={NotificationSetting}
        />
        <Drawer.Screen name="Language Setting" component={LanguageSetting} /> */}
      </Drawer.Navigator>
    );
  };

  const LanguageSettingAppDrawer = () => {
    return (
      <Drawer.Navigator
      // drawerContent={props => <CustomDrawerView {...props} />}
      >
        <Drawer.Screen name="Language Setting" component={LanguageSetting} />

        {/* <Drawer.Screen name="Setting" component={Settings} />
        <Drawer.Screen
          name="Notification Setting"
          component={NotificationSetting}
        /> */}
      </Drawer.Navigator>
    );
  };

  const NotificationSettingAppDrawer = () => {
    return (
      <Drawer.Navigator
      // drawerContent={props => <CustomDrawerView {...props} />}
      >
        <Drawer.Screen
          name="Notification Setting"
          component={NotificationSetting}
        />
        {/* <Drawer.Screen name="Setting" component={Settings} />

        <Drawer.Screen name="Language Setting" component={LanguageSetting} /> */}
      </Drawer.Navigator>
    );
  };

  const SettingTabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({route}: any) => ({
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
          tabBarShowLabel: true,
        })}>
        <Tab.Screen
          name="Main Setting"
          component={MainSettingAppDrawer}
          options={{
            headerShown: false,
            tabBarIcon: active => {
              // console.log(active);
              return (
                <Icon
                  name="application-settings"
                  size={20}
                  color={active.focused ? 'black' : 'grey'}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Language"
          component={LanguageSettingAppDrawer}
          options={{
            headerShown: false,
            tabBarIcon: active => {
              // console.log(active);
              return (
                <Icon
                  name="message-settings"
                  size={20}
                  color={active.focused ? 'black' : 'grey'}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationSettingAppDrawer}
          options={{
            headerShown: false,
            tabBarIcon: active => {
              // console.log(active);
              return (
                <Icon
                  name="cellphone-settings"
                  size={20}
                  color={active.focused ? 'black' : 'grey'}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    );
  };

  // Bottom tab navigator for authenticated screens
  const TabNavigator = () => (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({route}: any) => ({
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
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,

          // tabBarButton: props => {
          //   return <TabButton {...props} label="Home" logoname="home" />;
          // },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{
          headerShown: false,

          // tabBarBadge: cartItems > 0 ? cartItems : undefined,  //This is cause rerender that's why it's commented
          // tabBarIcon: ({color, size}) => (
          //   <Icon name="shopping-cart" size={size} color={color} />
          // ),
          // tabBarButton: props => {
          //   return (
          //     <TabButton {...props} label="Cart" logoname="shopping-cart" />
          //   );
          // },
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationStack}
        options={{
          headerShown: false,
          tabBarBadge: notification > 0 ? notification : undefined,
          // tabBarIcon: ({color, size}) => (
          //   <Icon name="bell-o" size={size} color={color} />
          // ),
          // tabBarButton: props => {
          //   return (
          //     <TabButton {...props} label="Notification" logoname="bell-o" />
          //   );
          // },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
          // tabBarIcon: ({color, size}) => (
          //   <Icon name="user-circle-o" size={size} color={color} />
          // ),
          // tabBarLabelPosition: 'beside-icon',
          // tabBarButton: props => {
          //   return (
          //     <TabButton {...props} label="Profile" logoname="user-circle-o" />
          //   );
          // },
        }}
      />
    </Tab.Navigator>
  );

  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        {/* Render either the authentication flow or the main stack */}
        {isAuthorized ? <BottomTabHideStack /> : <AuthStack />}
      </NavigationContainer>
    </View>
  );
};

export default NavigationRoute;
