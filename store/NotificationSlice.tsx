import {createSlice} from '@reduxjs/toolkit';

const Notification = createSlice({
  name: 'notification',
  initialState: {
    count: 4,
    notifications: [
      {
        message: 'hello there new notification',
        time: '5:30AM',
        title: 'New notification',
        id: 1,
      },
      {
        message:
          'Another, hello there new notification Another, hello there new notificatio Another, hello there new notificatio Another, hello there new notificatio',
        time: '3:30PM',
        title: 'New notification',
        id: 2,
      },
      {
        message: 'tng tong ,hello there new notification',
        time: '10:30AM',
        title: 'New notification',
        id: 3,
      },
      {
        message: 'ping ping ,hello there new notification',
        time: '7:30AM',
        title: 'New notification',
        id: 4,
      },
    ],
  },
  reducers: {
    notify: (state: any, action) => {
      state.count += 1;
      state.notifications.push(action.payload);
    },
    markasread: (state: any, action: any) => {
      state.notifications = state.notifications.filter(
        (item: any) => action.payload !== item.id,
      );
      state.count -= 1;
    },
  },
});

export const {notify, markasread} = Notification.actions;
export default Notification.reducer;
