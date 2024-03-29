import {Dimensions, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';

export const TabButton = ({label, isFocused, onPress, darkMode}: any) => {
  // console.log(isFocused, 'isFocused');
  // const {width} = Dimensions.get('window');
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
          style={[
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',

              borderRadius: 40,
            },
            {backgroundColor: darkMode ? 'black' : '#e7e7e7'},
          ]}>
          <View
            style={[
              {
                backgroundColor: 'black',
                borderRadius: 20,
                padding: 3,
                paddingVertical: 4.5,
              },
            ]}>
            <Icon name={getIconName(label)} size={17} color="white" />
          </View>
          <View>
            <Text
              style={[
                {
                  color: 'black',
                  paddingHorizontal: 5,
                  fontWeight: 'bold',
                  // width: width * 0.13,
                },
                {color: darkMode ? 'white' : 'black'},
              ]}
              numberOfLines={1}>
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
          <Icon
            name={getIconName(label)}
            size={17}
            color={darkMode ? 'white' : 'black'}
          />
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
