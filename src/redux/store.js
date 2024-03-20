// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/CartSlice';

export const store =  configureStore({
  reducer: {
    allcart: cartReducer, // Use 'cart' as the key
  },
});
