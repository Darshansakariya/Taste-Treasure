// src\features\login.jsx
// authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  error: null, // Add an error field to the initial state
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { dispatch }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        credentials
      );

      if (response.data.success) {
        const { token, user } = response.data.data;
        localStorage.setItem("token", token);
        dispatch(loginSuccess({ user, token }));
        return { user, token };
      } else {
        // Handle case when login is not successful
        dispatch(loginFailed(response.data.data.message)); // Dispatch loginFailed action with the error message
        return { error: response.data.data.message };
      }
    } catch (error) {
      // Handle network or server errors
      dispatch(loginFailed("An error occurred. Please try again later."));
      return { error: error.message };
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null; // Reset error on successful login
    },
    loginFailed: (state, action) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = action.payload; // Set error message from action payload
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null; // Reset error on logout
    },
  },
});

export const { loginSuccess, loginFailed, logout } = loginSlice.actions;
export default loginSlice.reducer;
