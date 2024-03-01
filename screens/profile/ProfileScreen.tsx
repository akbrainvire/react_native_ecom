import {View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import React from 'react';
import CustomButtonComponent from '../../components/generic/CustomButtonComponent';

import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../store/AuthenticSlice';
import {Image} from 'react-native-elements';
import ProfileOptions from '../../components/profile/ProfileOptions';
import Icon from 'react-native-vector-icons/AntDesign';
import {useTheme} from '../../context/ThemeContext';

const Card = ({name, email, image, darkMode}: any) => {
  return (
    <View
      style={[
        styles.cardContainer,
        {
          backgroundColor: darkMode ? 'black' : 'white',
          borderColor: darkMode ? 'grey' : 'black',
          borderWidth: darkMode ? 1 : 0,
        },
      ]}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.namemailContainer}>
        <Text style={[styles.name, {color: darkMode ? 'white' : 'black'}]}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Text>
        <Text style={[styles.email, {color: darkMode ? 'white' : 'black'}]}>
          {email}
        </Text>
      </View>
    </View>
  );
};
const ProfileScreen = ({navigation}: any) => {
  const userDetails = useSelector(
    (state: any) => state.autheticate.userDetails,
  );
  const {darkMode} = useTheme();

  console.log(userDetails, 'autheticate');
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());

    navigation.navigate('FirstScreenNoLogin');
  };

  const options = [
    {
      id: 1,
      name: 'Personal Details',
      logo: 'user-circle-o',
      route: 'Personal Details',
    },
    {
      id: 2,

      name: 'My Orders',
      logo: 'shopping-bag',
      route: 'My Orders',
    },
    {
      id: 3,

      name: 'My Favourites',
      logo: 'heart',
      route: 'My Favourites',
    },
    {
      id: 4,

      name: 'Shipping Address',
      logo: 'openid',
      route: 'Shipping Address',
    },
    {
      id: 5,

      name: 'My Card',
      logo: 'credit-card-alt',
      route: 'My Card',
    },
    {
      id: 6,

      name: 'Settings',
      logo: 'sun-o',
      route: 'Settings',
    },
  ];

  const options2 = [
    {
      id: 6,
      name: `FAQ's`,
      logo: 'question-circle-o',
      route: 'FAQ',
    },
    {
      id: 7,
      name: 'Privacy Policy',
      logo: 'at',
      route: 'Privacy Policy',
    },
    {
      id: 8,

      name: 'My Favourites',
      logo: 'heart',
      route: 'My Favourites',
    },
  ];
  console.log(userDetails.image, 'userimage');
  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: darkMode ? 'black' : 'white'},
      ]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card
          name={userDetails.username}
          email={userDetails.email}
          image={userDetails.image}
          darkMode={darkMode}
        />
        <ProfileOptions
          options={options}
          navigation={navigation}
          darkMode={darkMode}
        />
        <ProfileOptions
          options={options2}
          navigation={navigation}
          darkMode={darkMode}
        />
        <CustomButtonComponent
          color={darkMode ? 'white' : 'black'}
          textcolor={darkMode ? 'black' : 'white'}
          onSubmit={handleLogout}
          text="Logout"
          LogoComponent={() => (
            <Icon
              size={28}
              color={darkMode ? 'black' : 'white'}
              name="logout"
            />
          )}
          logoComp={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  cardContainer: {
    padding: 10,
    flexDirection: 'row',
    minHeight: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#5d5d5d',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  imageContainer: {
    width: 70,
    height: 70,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  namemailContainer: {
    paddingLeft: 10,

    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: 'black',
  },
});
export default ProfileScreen;
