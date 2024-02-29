import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../context/ThemeContext';

const HeaderBackButton = ({
  paddinghorizontal,
}: {
  paddinghorizontal?: number;
}) => {
  const navigation = useNavigation<any>();
  const handleGoBack = () => {
    navigation.goBack();
  };
  const {darkMode} = useTheme();

  return (
    <View
      style={[
        styles.container,
        {marginVertical: 10},
        paddinghorizontal
          ? {paddingHorizontal: paddinghorizontal}
          : {paddingHorizontal: 0},
      ]}>
      <View
        style={[
          styles.backButton,
          {backgroundColor: darkMode ? 'black' : 'white'},
        ]}>
        <TouchableOpacity onPress={handleGoBack}>
          {darkMode ? (
            <Icon
              name="arrow-back-circle-outline"
              size={38}
              color="#ffffff"
              style={styles.icon}
            />
          ) : (
            <Icon
              name="arrow-back-circle"
              size={38}
              color="#000000"
              style={styles.icon}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  propStyles: {
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 'auto',
    // backgroundColor: 'white',
    borderRadius: 20,
  },

  icon: {
    // marginHorizontal: 20,
  },
});

export default HeaderBackButton;
