// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import listingSlice from "./slices/listingSlice";
import userReducer from "./slices/userSlice";
import loadingSlice from "./slices/loadingSlice";

const store = configureStore({
  reducer: {
    listing: listingSlice,
    user: userReducer,
    loading: loadingSlice,
  },
});

export default store;
