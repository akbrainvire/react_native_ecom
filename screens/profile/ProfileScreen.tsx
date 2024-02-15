import {View, Text} from 'react-native';
import React from 'react';
import CustomButtonComponent from '../../components/generic/CustomButtonComponent';

import {useDispatch, useSelector} from 'react-redux';

import {logout} from '../../store/AuthenticSlice';
const ProfileScreen = ({navigation}: any) => {
  const state = useSelector((state: any) => state.autheticate);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());

    navigation.navigate('FirstScreenNoLogin');
  };
  return (
    <View>
      <Text>ProfileScreen</Text>
      <CustomButtonComponent
        color="red"
        textcolor="white"
        onSubmit={handleLogout}
        text="Logout"
      />
    </View>
  );
};

export default ProfileScreen;
