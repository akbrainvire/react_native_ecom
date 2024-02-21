import {call, put, takeLatest} from 'redux-saga/effects';
import {fetchProductsApi} from '../api/productsApi';
import {
  fetchProductsFailure,
  fetchProductsRequest,
  fetchProductsSuccess,
} from '../store/ProductsSlice';
import {PayloadAction, createAction} from '@reduxjs/toolkit';

export const fetchProductsReq = createAction<{categoryName: string}>(
  'products/fetchProductsRequest',
);

function* fetchProducts(
  action: PayloadAction<{categoryName: string}>,
): Generator<any, void, any> {
  try {
    const {categoryName} = action.payload;

    const products = yield call(fetchProductsApi, categoryName);
    yield put(fetchProductsSuccess(products));
  } catch (error) {
    yield put(fetchProductsFailure(error)); // Dispatch failure action
  }
}

export function* productSaga() {
  //Watchersaga
  yield takeLatest(fetchProductsReq.type, fetchProducts); // Listen for the latest action and run the fetchProducts saga
}
