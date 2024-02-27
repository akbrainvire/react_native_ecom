import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';

export const CustomDrawerTabButton = ({
  label,
  isActive = false,
  onPress,
}: any) => {
  console.log(label, 'isFocused');
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          //   justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 20,
          paddingHorizontal: 20,
          backgroundColor: isActive ? '#e7e7e7' : 'transparent',
          //   borderRadius: 20,
        }}>
        <View
          style={{
            backgroundColor: 'black',
            // borderRadius: 20,
            padding: 3,
            // paddingVertical: 4.5,
          }}>
          <Icon name={getIconName(label)} size={22} color="white" />
        </View>
        <View>
          <Text
            style={{
              color: 'black',
              paddingHorizontal: 15,
              fontWeight: 'bold',
            }}>
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const getIconName = (label: string) => {
  switch (label.toLowerCase()) {
    case 'setting':
      return 'setting';
    case 'languages':
      return 'language';
    case 'notification':
      return 'notification';
    case 'profile':
      return 'user';
    default:
      return 'home';
  }
};
