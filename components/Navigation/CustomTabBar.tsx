import {StyleSheet, View} from 'react-native';
import {TabButton} from './TabBarCustomButton';

export const CustomTabBar = ({state, descriptors, navigation}: any) => {
  return (
    <View style={styles.mainContainer}>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TabButton
            key={index}
            label={label}
            isFocused={isFocused}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },

    shadowOpacity: 0.1,
    shadowRadius: 10.0,
    elevation: 30,
    paddingVertical: 10,
    bottom: 0,
    width: '100%',
    zIndex: 0,
    borderTopWidth: 0,
    backgroundColor: 'white',
  },
});
