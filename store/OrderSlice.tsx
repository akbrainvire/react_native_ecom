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
    updateOrders: (state: any, action) => {
      const orderIndex = state.orders.findIndex(
        (order: any) => order.id === action.payload.id,
      );

      state.orders[orderIndex] = action.payload;
    },
  },
});

export const {addOrders, updateOrders} = Orders.actions;
export default Orders.reducer;
