// authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loginSuccess } from "./../../features/login";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { dispatch }) => {
    try {
      const response = await axios.post(
        "https://kind-gray-hippopotamus-tie.cyclic.app/users/login",
        credentials
      );
      if (response.data.success) {
        console.log("ini response data : ", response);
        const { token, user } = response.data.data; // Akses token dan user dari response.data.data
        localStorage.setItem("token", token);
        dispatch(loginSuccess({ user, token }));
        return { user, token };
      } else {
        // Handle case when login is not successful
        return { error: response.data.data.message };
      }
    } catch (error) {
      return { error: error.message };
    }
  }
);
