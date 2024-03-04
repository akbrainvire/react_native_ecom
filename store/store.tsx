// store/store.js
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AuthenticSlice from './AuthenticSlice';
import CartSlice from './CartSlice';
import NotificationSlice from './NotificationSlice';
import CategoryReducer from './CategorySlice';
import {thunk} from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import ProductsSlice from './ProductsSlice';
import rootSaga from '../sagas';
import OrderSlice from './OrderSlice';
import WishlistedSlice from './WishlistedSlice';
import persistReducer from 'redux-persist/es/persistReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const sagaMiddleware = createSagaMiddleware();

let persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

let rootReducer = combineReducers({
  autheticate: AuthenticSlice,
  cart: CartSlice,
  notification: NotificationSlice,
  category: CategoryReducer,
  orders: OrderSlice,
  products: ProductsSlice,
  wishlist: WishlistedSlice,
});

let persistedReducer: any = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleWare: any) =>
    getDefaultMiddleWare().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
