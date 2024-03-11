import {View, Text, StyleSheet, FlatList, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import moment from 'moment';
import {useTheme} from '../../../context/ThemeContext';
const OrderStepper = ({
  orderDetails,
  orderInfo,
}: {
  orderDetails: any;
  orderInfo: any;
}) => {
  let testorder = {
    orderDelivered: {date: 'March 12, 2024', time: '12:51 PM'},
    orderOutforDelivery: {date: 'March 12, 2024', time: '12:51 PM'},
    orderPlaced: {date: 'March 07, 2024', time: '12:51 PM'},
    orderShipped: {date: 'March 08, 2024', time: '12:51 AM'},
  };

  const {darkMode, colors} = useTheme();
  const [stepsCompleted, setstepsCompleted] = useState(1);

  console.log(orderDetails, 'orderdetails');
  const lineAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    for (const orderKey in orderDetails) {
      Animated.timing(lineAnimation, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      }).start();

      if (orderDetails.hasOwnProperty(orderKey)) {
        if (orderKey === 'orderPlaced') {
          continue;
        }
        const order = orderDetails[orderKey];
        const orderDate = moment(`${order.date} ${order.time}`, 'LL LT');
        if (moment().isAfter(orderDate)) {
          setstepsCompleted(prev => prev + 1);
        } else {
          break;
        }
      }
    }

    return () => {
      setstepsCompleted(1);
    };
  }, []);
  const data = [
    {
      date: orderDetails.orderPlaced.date,
      time: orderDetails.orderPlaced.time,
      thing: 'Order Placed',
      location: orderInfo.orderPlacedCity,
    },
    {
      date: orderDetails.orderShipped.date,
      time: orderDetails.orderShipped.time,
      location: orderInfo.orderShippedCity,

      thing: 'Order Shipped',
    },
    {
      date: orderDetails.orderOutforDelivery.date,
      time: orderDetails.orderOutforDelivery.time,
      location: orderInfo.orderOutforDeliveryCity,
      thing: 'Order out for Delivery',
    },
    {
      date: orderDetails.orderDelivered.date,
      time: orderDetails.orderDelivered.time,
      location: orderInfo.orderDeliveredCity,
      thing: 'Order Delivered',
    },
  ];

  const OneAndTwo = ({
    one,
    two,
    ispaddingRight,
  }: {
    one: any;
    two: any;
    ispaddingRight?: boolean;
  }) => {
    return (
      <View
        style={{paddingRight: ispaddingRight ? 30 : 0, position: 'relative'}}>
        <Text
          style={{
            color: darkMode ? colors.white : colors.black,
            fontWeight: 'bold',
            fontSize: 16,
          }}
          numberOfLines={2}>
          {one}
        </Text>
        <Text style={{color: colors.lightgrey, fontSize: 14}} numberOfLines={2}>
          {two}
        </Text>
      </View>
    );
  };

  const renderItems = (index: any, item: any) => {
    return (
      <View style={styles.stepContainer}>
        <OneAndTwo one={item.date} two={item.time} ispaddingRight={true} />
        <View style={styles.lineCircleContainer}>
          <View
            style={[
              styles.circle,
              {
                backgroundColor:
                  stepsCompleted > index
                    ? darkMode
                      ? colors.white
                      : colors.black
                    : '#a1a1a1',
              },
            ]}
          />
          {index == data.length - 1 ? (
            ''
          ) : (
            <Animated.View
              style={[
                styles.line,
                {
                  backgroundColor:
                    stepsCompleted > index
                      ? darkMode
                        ? colors.white
                        : colors.black
                      : '#a1a1a1',
                },
                {
                  backgroundColor: lineAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange:
                      stepsCompleted > index
                        ? ['grey', darkMode ? 'white' : 'black']
                        : ['grey', 'grey'],
                  }),
                },
              ]}
            />
          )}
        </View>
        <View style={{paddingLeft: 20}}>
          <OneAndTwo one={item.thing} two={item.location} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {/* <View style={styles.container}> */}
      <FlatList
        data={data}
        renderItem={({index, item}) => renderItems(index, item)}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => <Text>No data found</Text>}
      />
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  stepContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    flex: 1,
    // padding: 20,
    height: 70,
  },
  circle: {
    // backgroundColor: 'black',
    height: 10,
    width: 10,
    borderRadius: 10,
    position: 'relative',
  },
  line: {
    width: 5,
    height: 56,
    padding: 0,
    position: 'absolute',
    top: 22,
    left: 2.5,
    // backgroundColor: 'black',
  },
  lineCircleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: 30,
    paddingRight: 30,
    position: 'absolute',
    left: 130,
  },
});

export default OrderStepper;
