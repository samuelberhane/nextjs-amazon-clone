import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart
    ADD_ITEM: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
    },
    // increase the amount of an item
    INCREASE_AMOUNT: (state, action) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === action.payload)
          return { ...item, amount: item.amount + 1 };
        else return item;
      });
    },
    // decrease the amount of an item
    DECREASE_AMOUNT: (state, action) => {
      state.cartItems = state.cartItems
        .map((item) => {
          if (item.id === action.payload)
            return { ...item, amount: item.amount - 1 };
          else return item;
        })
        .filter((item) => item.amount > 0);
    },
    // remove item from the cart
    REMOVE_ITEM: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { ADD_ITEM, INCREASE_AMOUNT, DECREASE_AMOUNT, REMOVE_ITEM } =
  cartSlice.actions;
export const selectCartItems = (state) => state.cart.cartItems;

export default cartSlice.reducer;
