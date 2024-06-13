import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiServerNode from "../../apiServerNodeConfig";

const loadUserFromStorage = () => {
  const user = localStorage.getItem("user");
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
  localStorage.setItem("user", JSON.stringify(user));
};

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const user = {
      username: userData.username,
      email: userData.email,
      image: userData.image,
      phone: userData.phone,
      cnic: userData.cnic,
      currentAddress: userData.currentAddress,
      uid: userData.uid,
      token: userData.token,
    };
    // console.log(user);
    try {
      const response = await apiServerNode.post("/api/user", user, {
        headers: {
          "x-auth-token": userData.idToken,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData) => {
    const user = {
      username: userData.username,
      email: userData.email,
      image: userData.image,
      phone: userData.phone,
      cnic: userData.cnic,
      currentAddress: userData.currentAddress,
      token: userData.token,
      uid: userData.uid,
    };
    try {
      const response = await apiServerNode.put("/api/user", user, {
        headers: {
          // 'x-auth-token': userData.idToken,
          uid: user.uid,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateUserToken = createAsyncThunk(
  "user/updateUserToken",
  async ({ uid, addTokenAmount }) => {
    const response = await apiServerNode.put(
      "/api/user/updateToken",
      {
        addTokenAmount,
      },
      {
        headers: {
          uid,
        },
      }
    );
    return response.data;
  }
);

export const deductToken = createAsyncThunk(
  "user/deductToken",
  async ({ uid, amountToDeduct }, thunkAPI) => {
    try {
      const response = await apiServerNode.put(`/api/user/deductToken/${uid}`, {
        amount: amountToDeduct, // Negative amount to deduct
      });
      return response.data; // Assuming the server responds with updated user data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); // Handle errors
    }
  }
);

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (data) => {
    try {
      const response = await apiServerNode.get(`/api/user/${data.uid}`, {
        headers: {
          // 'x-auth-token': params.uidToken,
          uid: data.uid,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: loadUserFromStorage(),
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: {
    [getUserData.fulfilled]: (state, action) => {
      state.user = action.payload;
      // console.log("User data fetched");
      saveUserToStorage(action.payload[0]);
      // console.log(state.user);
    },
    [getUserData.rejected]: (state, action) => {
      // console.log("Error fetching user data");
      console.log(action.error);
    },
    [updateUserToken.fulfilled]: (state, action) => {
      saveUserToStorage(action.payload);
      state.user.token = action.payload.token;
    },
    [updateUserToken.rejected]: (state, action) => {
      console.log("Error updating user token");
      console.log(action.error);
    },
    [deductToken.fulfilled]: (state, action) => {
      saveUserToStorage(action.payload);
      state.user.token = action.payload.token;
    },
    [deductToken.rejected]: (state, action) => {
      console.log("Error deducting token");
      console.log(action.error);
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
