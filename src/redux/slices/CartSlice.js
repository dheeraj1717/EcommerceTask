import { createSlice } from "@reduxjs/toolkit";
import products from '../../products.js'

const initialState = {
  cart: [],
  items: products,
  totalquantity: 0
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity } = action.payload;
      const cartItem = state.cart.find((item) => item.id === id);

      if (cartItem) {
        cartItem.quantity += quantity;
      } else {
        state.cart.push({ ...action.payload });
      }

      state.totalquantity = state.cart.reduce((total, item) => total + item.quantity, 0);
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.cart = state.cart.filter((item) => item.id !== id);
      state.totalquantity = state.cart.reduce((total, item) => total + item.quantity, 0);
    },
  }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
