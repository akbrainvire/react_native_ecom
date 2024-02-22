import {createSlice} from '@reduxjs/toolkit';

const Wishlist = createSlice({
  name: 'wishlist',
  initialState: {
    wishlisted: [],
  },
  reducers: {
    addToWishlist: (state: any, action) => {
      state.wishlisted = [...state.wishlisted, action.payload];
    },
    removeFromWishlist: (state: any, action) => {
      state.wishlisted = state.wishlisted.filter((item: any) => {
        return item.id !== action.payload;
      });
    },
  },
});

export const {addToWishlist, removeFromWishlist} = Wishlist.actions;
export default Wishlist.reducer;
