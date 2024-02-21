import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  categoryProducts: [],
  loading: false,
  error: '',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsRequest: state => {
      state.loading = true;
      state.error = '';
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.categoryProducts = action.payload;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
} = productSlice.actions;

export default productSlice.reducer;
