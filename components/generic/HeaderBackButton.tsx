import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const HeaderBackButton = ({
  paddinghorizontal,
}: {
  paddinghorizontal?: boolean;
}) => {
  const navigation = useNavigation<any>();
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View
      style={[
        styles.container,
        {marginVertical: 10},
        paddinghorizontal ? styles.propStyles : null,
      ]}>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon
            name="arrow-back-circle"
            size={38}
            color="#000"
            style={styles.icon}
          />
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
    backgroundColor: 'white',
    borderRadius: 20,
  },

  icon: {
    // marginHorizontal: 20,
  },
});

export default HeaderBackButton;
