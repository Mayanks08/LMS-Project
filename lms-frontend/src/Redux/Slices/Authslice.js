import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";
const initialState = {
  isLoggedIn: localStorage.getItem("isloggedIn") || false,
  role: localStorage.getItem("role") || "",
  data: localStorage.getItem("data")  ? JSON.parse(localStorage.getItem("data")) :{}|| {},
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axiosInstance.post("user/register", data);
    toast.promise(res, {
      loading: "Wait Creating the account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create account ",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});
export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = axiosInstance.post("user/login", data);
    toast.promise(res, {
      loading: "Wait! Authcation in progress...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to Login ",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = axiosInstance.post("user/logout");
    toast.promise(res, {
      loading: "Wait! Logout in progress...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to LogOut ",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const updateProfile = createAsyncThunk("/user/update/profile", async (data) => {
  try {
    const res = axiosInstance.put(`user/update/profile${data[0]}`, data[1]);
    toast.promise(res, {
      loading: "Wait! Profile Update  in progress...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to UpdateProfile ",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const getUserData = createAsyncThunk("/user/details", async () => {
  try {
    const res = axiosInstance.get("user/me");
    
    return (await res).data;
  } catch (error) {
    toast.error(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isloggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.role = action?.payload?.user?.role;
        state.data = action?.payload?.user;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.data = {};
        state.isLoggedIn = false;
        state.role = "";
      })
      .addCase(getUserData.fulfilled,(state,action)=>{
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isloggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.role = action?.payload?.user?.role;
        state.data = action?.payload?.user;
      })
  },
});

// export const {dc} = authSlice.actions
export default authSlice.reducer;
