// src/store/action/login.jsx

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loginSuccess, loginFailed } from "../../features/login";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { dispatch }) => {
    try {
      const response = await axios.post(
        "https://kind-gray-hippopotamus-tie.cyclic.app/users/login",
        credentials
      );

      if (response.data.success) {
        const { token, user } = response.data.data;
        localStorage.setItem("token", token);
        dispatch(loginSuccess({ user, token }));
        return { user, token };
      } else {
        const errorMessage = response.data.data.message;

        if (errorMessage === "Incorrect password") {
          dispatch(loginFailed(errorMessage));
        }

        return { error: errorMessage };
      }
    } catch (error) {
      return { error: error.message };
    }
  }
);
