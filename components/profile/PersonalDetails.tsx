import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomButtonComponent from '../generic/CustomButtonComponent';
import {logout, updateUserOptions} from '../../store/AuthenticSlice';
import Icon from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native';
import SettingCustomOption from './SettingCustomOption';
import BasicModal from '../generic/BasicModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '../../context/ThemeContext';
import SingleRadioButton from './SingleRadioButton';

const {height, width} = Dimensions.get('window');

const PersonalDetails = ({navigation}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const {darkMode, toggleDarkMode} = useTheme();
  const userDetails = useSelector(
    (state: any) => state.autheticate.userDetails,
  );
  const [selectedGenderId, setselectedGenderId] = useState(
    userDetails.gender.toLowerCase() === 'female' ? 2 : 1,
  );

  const [options, setOptions] = useState({
    language: 'English',
    darkMode: false,
    notification: false,
  });

  console.log(darkMode, options.darkMode);
  const dispatch = useDispatch();

  const handleSelect = (value: any) => {
    setOptions((prev: any) => {
      return {
        ...prev,
        language: value,
      };
    });
    setIsOpen(!isOpen);
  };

  const updateAsyncStorage = () => {
    // AsyncStorage.setItem('userOptions', JSON.stringify(options)).catch(error =>
    //   console.error('Error storing options:', error),
    // );

    AsyncStorage.removeItem('userOptions');
  };
  const fetchData = async () => {
    try {
      const storedOptions = await AsyncStorage.getItem('userOptions');
      if (storedOptions !== null) {
        console.log(storedOptions, 'storeoption');
        setOptions(JSON.parse(storedOptions));
      } else {
        console.log('No options found in AsyncStorage.');
        updateAsyncStorage();
      }
    } catch (error) {
      console.error('Error retrieving options from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    fetchData();

    // console.log(options, 'options');
  }, []);

  const handleLogout = () => {
    dispatch(logout());

    navigation.navigate('FirstScreenNoLogin');
  };

  useEffect(() => {
    updateAsyncStorage();
  }, [options]);
  const handleOnPressSettingOption = (type: string) => {
    if (type === 'language') {
      setIsOpen(true);
    } else if (type === 'notification') {
      setOptions((prev: any) => ({
        ...prev,
        notification: !prev.notification,
      }));
    } else if (type === 'darkMode') {
      toggleDarkMode();
      setOptions((prev: any) => ({
        ...prev,
        darkMode: !prev.darkMode,
      }));
    } else if (type === 'helpcenter') {
      navigation.navigate('Help Center');
    }
  };
  // AsyncStorage.getItem('userOptions').then(res => console.log(res, 'response'));
  // console.log(options, 'hasufdhbwaie');

  // console.log(options.notification, 'optajsbfkaseou');
  const handleGender = (value: any) => {
    setselectedGenderId(value);
    console.log(value);
  };

  return (
    <ScrollView
      style={[
        styles.mainContainer,
        {backgroundColor: darkMode ? 'black' : 'white'},
      ]}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainerMain}>
          <View style={styles.imageContainer}>
            <Image
              source={userDetails.image}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View style={styles.editOrupload}>
            <TouchableOpacity style={styles.editBtn}>
              <Icon size={20} color="black" name="edit" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.row}>
            <Text style={[styles.label, darkMode && styles.labelDarkMode]}>
              Name:
            </Text>
            <TextInput
              style={[styles.input, {color: darkMode ? 'white' : 'black'}]}
              value={`${
                userDetails.username.charAt(0).toUpperCase() +
                userDetails.username.slice(1)
              }`}
              editable={false}
            />
          </View>
          <View style={styles.row}>
            <Text style={[styles.label, darkMode && styles.labelDarkMode]}>
              Age:
            </Text>
            <TextInput
              style={[styles.input, {color: darkMode ? 'white' : 'black'}]}
              value={userDetails.age.toString()}
              editable={false}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              marginTop: 10,
            }}>
            <Text style={[styles.label, darkMode && styles.labelDarkMode]}>
              Gender:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 5,
              }}>
              <SingleRadioButton
                button={{id: 1, value: 'Male'}}
                darkMode={darkMode}
                selectedId={selectedGenderId}
                handleGender={handleGender}
              />
              <SingleRadioButton
                button={{id: 2, value: 'Female'}}
                darkMode={darkMode}
                selectedId={selectedGenderId}
                handleGender={handleGender}
              />
            </View>
            {/* <TextInput
              style={[styles.input, {color: darkMode ? 'white' : 'black'}]}
              value={userDetails.gender}
              editable={false}
            /> */}
          </View>
          <View style={styles.row}>
            <Text style={[styles.label, darkMode && styles.labelDarkMode]}>
              Email:
            </Text>
            <TextInput
              style={[styles.input, {color: darkMode ? 'white' : 'black'}]}
              value={userDetails.email}
              editable={false}
            />
          </View>
        </View>
        <View style={styles.settingsContainer}>
          <Text
            style={[
              styles.settingsHeader,
              {color: darkMode ? 'white' : 'black'},
            ]}>
            Settings
          </Text>
          <View style={styles.settingOptionContainer}>
            <SettingCustomOption
              logo="language"
              onPress={() => handleOnPressSettingOption('language')}
              isToggle={false}
              name={'Language'}
              language={options.language}
            />
            <BasicModal
              options={['English', 'Hindi', 'Gujrati', 'Marathi', 'Punjabi']}
              onSelect={handleSelect}
              isOpen={isOpen}></BasicModal>
            <SettingCustomOption
              logo="notifications-circle"
              onPress={() => handleOnPressSettingOption('notification')}
              isToggle={true}
              toggle={options.notification}
              name={'Notification'}
            />
            <SettingCustomOption
              // logo={userOptions.darkMode ? 'moon' : 'sunny'}
              logo={'moon'}
              onPress={() => handleOnPressSettingOption('darkMode')}
              toggle={darkMode}
              isToggle={true}
              name={'Dark Mode'}
            />
            <SettingCustomOption
              logo="help-circle-sharp"
              onPress={() => handleOnPressSettingOption('helpcenter')}
              isToggle={false}
              name={'Help Center'}
            />
          </View>
        </View>

        <View style={styles.logoutContainer}>
          <CustomButtonComponent
            color="black"
            textcolor="white"
            logo={'sign-out'}
            onSubmit={handleLogout}
            text="Logout"
            // LogoComponent={() => <Icon size={28} color="white" name="logout" />}
            // logoComp={true}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  contentContainer: {
    // flexGrow: 1,
    alignItems: 'center',
  },
  imageContainerMain: {
    // height: height * 0.2,
    // width: width * 0.8,
  },
  imageContainer: {
    // marginTop: height * 0.05,
    marginBottom: 10,
    // backgroundColor: 'white',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,
    borderRadius: 5,
    borderWidth: 1,
    padding: 2,
    borderColor: 'grey',

    // elevation: 2,
    width: 90,
    height: 90,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    // borderRadius: 75,
  },
  editBtn: {
    padding: 2,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  editOrupload: {
    position: 'absolute',
    bottom: 12,
    right: 2,
  },
  detailsContainer: {
    // height: height * 0.2,
    width: width * 0.9,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 5,
    justifyContent: 'space-between',
  },
  label: {
    width: 100,

    fontSize: 16,
    fontWeight: 'bold',
  },
  labelDarkMode: {
    color: 'white',
    width: 100,

    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    height: 35,
    fontSize: 15,
    fontWeight: '500',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 0,
  },
  settingsContainer: {
    // height: height * 0.25,
    // flex: 1,
    width: width * 0.9,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  settingsHeader: {
    fontSize: 24,
    fontWeight: '800',

    marginBottom: 20,
  },
  settingOptionContainer: {
    // flex: 1,
    // justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#cecece',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  settingsOption: {
    marginVertical: 5,
  },
  logoutContainer: {
    // height: height * 0.05,
    width: width * 0.9,
    marginTop: 'auto',
    marginBottom: 20,
  },
});

export default PersonalDetails;
