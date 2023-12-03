// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import listingsSlice from "./slices/listingsSlice";

const store = configureStore({
  reducer: {
    listing: listingsSlice,
  },
});

export default store;
