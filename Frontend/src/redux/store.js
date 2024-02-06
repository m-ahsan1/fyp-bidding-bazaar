// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import listingSlice from "./slices/listingSlice";
import useReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    listing: listingSlice,
    user: useReducer,
  },
});

export default store;
