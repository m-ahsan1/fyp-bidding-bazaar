import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        isLoading: true,
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
            // console.log('loading', action.payload);
        },
    },
});

export const { setLoading } = loadingSlice.actions;

export const selectLoading = (state) => state.loading.isLoading;

export default loadingSlice.reducer;
