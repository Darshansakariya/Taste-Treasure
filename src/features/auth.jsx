// features/auth/authSlice.js

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const auth = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
      state.error = null;

      // Save token to localStorage
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
  },
});
//logins
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(setLoading());

    const response = await axios.post("http://localhost:3000/users/login", {
      email,
      password,
    });
    console.log(response.data);
    dispatch(
      loginSuccess({ user: response.data.users, token: response.data.token })
    );

    // Save token to localStorage
    localStorage.setItem("token", response.data.token);

    // Redirect or perform other actions
    // Example: navigate to home
    dispatch(setLoading());
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const { loginSuccess, logout, setError, setLoading } = auth.actions;
export default auth.reducer;
