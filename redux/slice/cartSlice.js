import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_PRODUCT: (state, action) => {},
  },
});

export const { ADD_PRODUCT } = cartSlice.actions;
export const selectAmount = (state) => state.cart.amount;

export default cartSlice.reducer;
