import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: [],
    currentPage: 1,
    itemsPerPage: 5,
    showAlert: false,
    alertData: {
      type: "",
      message: "",
    },
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setShowAlert: (state, action) => {
      state.showAlert = action.payload;
    },
    setAlertData: (state, action) => {
      state.alertData = action.payload;
    },
    deleteItem: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  setCurrentPage,
  setData,
  setShowAlert,
  setAlertData,
  deleteItem,
} = profileSlice.actions;

export default profileSlice.reducer;
