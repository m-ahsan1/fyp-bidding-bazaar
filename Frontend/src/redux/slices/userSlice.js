import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const loadUserFromStorage = () => {
    const user = localStorage.getItem('user');
    try {
        if (user !== undefined) {
            return JSON.parse(user);
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error parsing user from storage:", error);
        return null;
    }
};

const saveUserToStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const createUser = createAsyncThunk('user/createUser', async (userData) => {
    const user = {
        username: userData.username,
        email: userData.email,
        image: userData.image,
        phone: userData.phone,
        cnic: userData.cnic,
        currentAddress: userData.currentAddress,
        uid: userData.uid,
    };
    try {
        const response = await axios.post('http://localhost:3001/api/user', user, {
            headers: {
                'x-auth-token': userData.idToken,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const updateUser = createAsyncThunk('user/updateUser', async (userData) => {
    const user = {
        username: userData.username,
        email: userData.email,
        image: userData.image,
        phone: userData.phone,
        cnic: userData.cnic,
        currentAddress: userData.currentAddress,
        uid: userData.uid,
    };
    try {
        const response = await axios.put('http://localhost:3001/api/user', user, {
            headers: {
                // 'x-auth-token': userData.idToken,
                'uid': user.uid,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const getUserData = createAsyncThunk('user/getUserData', async (params) => {
    try {
        const response = await axios.get('http://localhost:3001/api/user', {
            headers: {
                // 'x-auth-token': params.uidToken,
                'uid': params.uid,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: loadUserFromStorage(),
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        },
    },
    extraReducers: {
        [getUserData.fulfilled]: (state, action) => {
            state.user = action.payload;
            console.log("User data fetched");
            saveUserToStorage(action.payload[0]);
            console.log(state.user);
        },
        [getUserData.rejected]: (state, action) => {
            console.log("Error fetching user data");
            console.log(action.error);
        },
    },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;