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

        // Check if the error message indicates incorrect password
        if (errorMessage.toLowerCase().includes("incorrect password")) {
          // Dispatch loginFailed with the specific error message
          dispatch(loginFailed(errorMessage));
        } else {
          // Dispatch loginFailed with a generic error message
          dispatch(loginFailed("An error occurred. Please try again later."));
        }

        return { error: errorMessage };
      }
    } catch (error) {
      // Dispatch loginFailed with the error message from the catch block
      dispatch(loginFailed(error.message));
      return { error: error.message };
    }
  }
);
