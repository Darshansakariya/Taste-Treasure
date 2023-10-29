// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    loginFailed: (state, action) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = action.payload; // Set pesan kesalahan dari payload action
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, loginFailed, logout } = login.actions;
export default login.reducer;
