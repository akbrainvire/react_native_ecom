// store/store.js
import {configureStore} from '@reduxjs/toolkit';
import AuthenticSlice from './AuthenticSlice';
import CartSlice from './CartSlice';
import NotificationSlice from './NotificationSlice';

const store = configureStore({
  reducer: {
    autheticate: AuthenticSlice,
    cart: CartSlice,
    notification: NotificationSlice,
  },
});

export default store;
