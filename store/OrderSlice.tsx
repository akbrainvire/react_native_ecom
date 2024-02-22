import {createSlice} from '@reduxjs/toolkit';

const Orders = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
  },
  reducers: {
    addOrders: (state: any, action) => {
      state.orders = [...state.orders, ...action.payload];
    },
  },
});

export const {addOrders} = Orders.actions;
export default Orders.reducer;
