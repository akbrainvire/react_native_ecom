// store/store.js
import {configureStore} from '@reduxjs/toolkit';
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

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    autheticate: AuthenticSlice,
    cart: CartSlice,
    notification: NotificationSlice,
    category: CategoryReducer,
    orders: OrderSlice,
    products: ProductsSlice,
    wishlist: WishlistedSlice,
  },
  middleware: (getDefaultMiddleWare: any) =>
    getDefaultMiddleWare().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
