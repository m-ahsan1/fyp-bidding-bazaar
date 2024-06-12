import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiServerNode from "../../apiServerNodeConfig";

export const fetchListings = createAsyncThunk(
  "listings/fetchListings",
  async () => {
    const response = await apiServerNode.get("/api/listings");
    return response.data;
  }
);

export const addListing = createAsyncThunk(
  "listings/addListing",
  async (listing) => {
    const response = await apiServerNode.post("/api/listings", listing);
    return response.data;
  }
);

export const deleteListing = createAsyncThunk(
  "listings/deleteListing",
  async (id) => {
    await apiServerNode.delete(`/api/listings/${id}`);
    return id;
  }
);

export const editListing = createAsyncThunk(
  "listings/editListing",
  async (listing) => {
    const response = await apiServerNode.put(`/api/listings/${listing.id}`, listing);
    return response.data;
  }
);

export const setSold = createAsyncThunk(
  "listings/setSold",
  async (id) => {
    const response = await apiServerNode.put(`/api/listings/${id}`, { isSold: true });
    return response.data;
  }
);

const listingSlice = createSlice({
  name: "listings",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addListing.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteListing.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default listingSlice.reducer;
