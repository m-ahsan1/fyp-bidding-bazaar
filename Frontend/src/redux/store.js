// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import listingsSlice from "./slices/listingsSlice";
import useReducer from "./slices/userSlice"

const store = configureStore({
  reducer: {
    listing: listingsSlice,
    user: useReducer,
  },
});

export default store;