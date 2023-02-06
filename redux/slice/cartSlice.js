import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Check local storage saved cartItems
    GET_ITEMS: (state, action) => {
      state.cartItems = action.payload;
    },
    REMOVE_ITEMS: (state, action) => {
      (state.cartItems = []), localStorage.removeItem("cartItems");
    },
    // Add item to cart
    ADD_ITEM: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    // increase the amount of an item
    INCREASE_AMOUNT: (state, action) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === action.payload)
          return { ...item, amount: item.amount + 1 };
        else return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
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
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    // remove item from the cart
    REMOVE_ITEM: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const {
  ADD_ITEM,
  INCREASE_AMOUNT,
  DECREASE_AMOUNT,
  REMOVE_ITEM,
  GET_ITEMS,
  REMOVE_ITEMS,
} = cartSlice.actions;
export const selectCartItems = (state) => state.cart.cartItems;

export default cartSlice.reducer;
