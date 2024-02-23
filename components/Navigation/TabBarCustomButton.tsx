import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';

export const TabButton = ({label, isFocused, onPress}: any) => {
  console.log(label, 'isFocused');
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {isFocused ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',

            backgroundColor: '#e7e7e7',
            borderRadius: 20,
          }}>
          <View
            style={{
              backgroundColor: 'black',
              borderRadius: 20,
              padding: 3,
              paddingVertical: 4.5,
            }}>
            <Icon name={getIconName(label)} size={17} color="white" />
          </View>
          <View>
            <Text
              style={{
                color: 'black',
                paddingHorizontal: 5,
                fontWeight: 'bold',
              }}>
              {label}
            </Text>
          </View>
        </View>
      ) : (
        <View
          style={{
            // backgroundColor: 'black',
            borderRadius: 20,
            padding: 3,
            // paddingVertical: 4.5,
          }}>
          <Icon name={getIconName(label)} size={17} color="black" />
        </View>
      )}
    </TouchableOpacity>
  );
};

const getIconName = (label: string) => {
  switch (label.toLowerCase()) {
    case 'home':
      return 'home';
    case 'cart':
      return 'shopping-cart';
    case 'notification':
      return 'notification';
    case 'profile':
      return 'user';
    default:
      return 'home';
  }
};
