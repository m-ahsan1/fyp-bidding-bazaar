import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createUser = createAsyncThunk('user/createUser', async (userData) => {
    try {
        // Make an Axios request to your backend for user creation
        const response = await axios.post('http://localhost:3001/api/user', userData, {
            headers: {
                'x-auth-token': userData.idToken,
                // Add other headers if needed
            },
        });

        return response.data; // Assuming the response contains user data
    } catch (error) {
        throw error;
    }
});

export const getUserData = createAsyncThunk('user/getUserData', async (params) => {
    try {
        // Make an Axios request to your backend for user creation
        const response = await axios.get('http://localhost:3001/api/user', {
            headers: {
                'x-auth-token': params.idToken,
            },
        });

        return response.data; // Assuming the response contains user data
    } catch (error) {
        throw error;
    }
});

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        login: (state, action) => {

            state.user = action.payload;
            console.log(state.user);
        },
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) =>{
        builder
            .addCase(createUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.user = null;
            })
            .addCase(getUserData.rejected, (state, action) => {
                state.user = null;
            });
    }
});

export const { login, logout } = userSlice.actions;

// selectors
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;