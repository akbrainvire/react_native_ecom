import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import {markasread} from '../../store/NotificationSlice';

const NotificationCard = ({title, message, time, id}: any) => {
  const dispatch = useDispatch();

  const handleMarkAsRead = (id: any) => {
    dispatch(markasread(id));
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo.png')} // Replace with your logo source
          style={styles.logo}
        />
        <View style={styles.messageContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message} numberOfLines={2} ellipsizeMode="tail">
            {message}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => handleMarkAsRead(id)}>
          <Text style={styles.markAsReadButton}>Mark as read</Text>
        </TouchableOpacity>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

const NotificationScreen = () => {
  const notifications = useSelector(
    (state: any) => state.notification.notifications,
  );

  return (
    <View style={styles.container}>
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={({item}) => (
            <NotificationCard
              title={item.title}
              message={item.message}
              time={item.time}
              id={item.id}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <Text>No notifications</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
  },
  messageContainer: {
    flex: 1, // Ensure the container takes full height
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    marginBottom: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  markAsReadButton: {
    color: '#AF8D86',
    fontWeight: 'bold',
    borderWidth: 1,

    borderColor: '#AF8D86',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  time: {
    fontSize: 12,
    color: 'grey',
  },
});

export default NotificationScreen;
