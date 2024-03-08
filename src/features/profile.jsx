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
    bookmarkedRecipes: [],
    likedRecipes: [],
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
    addToBookmarks: (state, action) => {
      state.bookmarkedRecipes.push(action.payload);
    },
    addToLiked: (state, action) => {
      state.likedRecipes.push(action.payload);
    },
  },
});

export const {
  setCurrentPage,
  setData,
  setShowAlert,
  setAlertData,
  deleteItem,
  addToBookmarks,
  addToLiked,
} = profileSlice.actions;

export default profileSlice.reducer;
