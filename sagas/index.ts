import {all} from 'redux-saga/effects';
import {productSaga} from './productSaga';

export default function* rootSaga() {
  yield all([
    productSaga(),
    // Add other sagas here if you have more
  ]);
}
