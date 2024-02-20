// actions.js
import {
  loginStart,
  loginSuccess,
  loginFailure,
  setRegistrationData,
  setRegistrationError,
  axios,
  setLoading,
} from "./../../features/auth.jsx";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(loginStart());

    const response = await axios.post(
      "https://kind-gray-hippopotamus-tie.cyclic.app/users/login",
      {
        email,
        password,
      }
    );

    dispatch(
      loginSuccess({ user: response.data.users, token: response.data.token })
    );

    // Save Token to Local Storage
    localStorage.setItem("token", response.data.token);
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading());

    const response = await axios.post(
      "https://kind-gray-hippopotamus-tie.cyclic.app/users/regis",
      userData
    );

    dispatch(setRegistrationData(response.data));

    // You can add navigation or other actions here if needed
  } catch (error) {
    dispatch(setRegistrationError(error.message));
  }
};
