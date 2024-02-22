import {createSlice} from '@reduxjs/toolkit';

const Cart = createSlice({
  name: 'authorized',
  initialState: {
    cartItems: [],
    cartItemCount: 0,
  },
  reducers: {
    addToCart: (state: any, action) => {
      const {id, name, size, quantity, brand, price, thumbnail, color} =
        action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item: any) => item.id === id && item.size === size,
      );

      if (existingItemIndex !== -1) {
        // If item with same id and size exists, increase quantity
        state.cartItems[existingItemIndex].quantity += quantity;
        state.cartItemCount += quantity;
        state.cartItems[existingItemIndex].totalPrice += price * quantity;
      } else {
        // Otherwise, add new item to cart
        state.cartItems.push({
          id: id,
          name: name,
          size: size,
          brand: brand,
          price: price,
          totalPrice: price * quantity,
          quantity: quantity,
          thumbnail: thumbnail,
          color: color !== '' ? color : null,
        });
        state.cartItemCount += quantity;
      }
    },
    removeFromCart: (state: any, action: any) => {
      const idToRemove = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item: any) => item.id === idToRemove,
      );

      if (itemIndex !== -1) {
        if (state.cartItems[itemIndex].quantity > 1) {
          state.cartItems[itemIndex].quantity--;

          state.cartItems[itemIndex].totalPrice -=
            state.cartItems[itemIndex].price;
          state.cartItemCount--;
        } else {
          state.cartItems.splice(itemIndex, 1);
          state.cartItemCount--;
        }
      }
    },
    removeFromCartFull: (state: any, action: any) => {
      const idToRemove = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item: any) => item.id === idToRemove,
      );

      if (itemIndex !== -1) {
        state.cartItemCount -= state.cartItems[itemIndex].quantity;
        state.cartItems.splice(itemIndex, 1);
      }
    },
    emptyCartafterOplaced: (state: any) => {
      state.cartItems = [];
      state.cartItemCount = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  removeFromCartFull,
  emptyCartafterOplaced,
} = Cart.actions;
export default Cart.reducer;
