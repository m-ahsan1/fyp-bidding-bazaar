import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchListings = createAsyncThunk(
  "listings/fetchListings",
  async () => {
    const response = await fetch("http://localhost:3001/api/listings");
    return await response.json();
  }
);

export const addListing = createAsyncThunk(
  "listings/addListing",
  async (listing) => {
    const response = await fetch("http://localhost:3001/api/listings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listing),
    });
    return await response.json();
  }
);

export const deleteListing = createAsyncThunk(
  "listings/deleteListing",
  async (id) => {
    await fetch(`http://localhost:3001/api/listings/${id}`, {
      method: "DELETE",
    });
    return id;
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
