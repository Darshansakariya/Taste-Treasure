// actions.js
import {
  loginStart,
  loginSuccess,
  loginFailure,
  setRegistrationData,
  setRegistrationError,
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

    // Simpan token ke localStorage
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

    // Anda dapat menambahkan navigasi atau tindakan lain di sini jika perlu
  } catch (error) {
    dispatch(setRegistrationError(error.message));
  }
};
