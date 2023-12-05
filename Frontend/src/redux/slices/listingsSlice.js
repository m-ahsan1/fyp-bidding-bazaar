// src/features/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching data
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await axios.get("http://localhost/api/listings");
  return response.data;
});

// Async thunk for creating data
export const createData = createAsyncThunk(
  "data/createData",
  async (newData) => {
    const response = await axios.post("http://localhost/api/listings", newData);
    return response.data;
  }
);

// Async thunk for updating data
export const updateData = createAsyncThunk(
  "data/updateData",
  async (updatedData) => {
    const response = await axios.put(
      `http://localhost/api/listings/${updatedData.id}`,
      updatedData
    );
    return response.data;
  }
);

// Async thunk for deleting data
export const deleteData = createAsyncThunk(
  "data/deleteData",
  async (dataId) => {
    await axios.delete(`http://localhost/api/listings/${dataId}`);
    return dataId;
  }
);

const listingsSlice = createSlice({
  name: "data",
  initialState: { data: [], loading: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(createData.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateData.fulfilled, (state, action) => {
        const updatedItemIndex = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        state.data[updatedItemIndex] = action.payload;
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
      });
  },
});

export default listingsSlice.reducer;