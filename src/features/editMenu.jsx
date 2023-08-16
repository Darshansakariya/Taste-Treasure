import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  ingredients: "",
  category_id: "",
  img: null,
};

const editMenu = createSlice({
  name: "editMenu",
  initialState,
  reducers: {
    updateTitle: (state, action) => {
      state.title = action.payload;
    },
    updateIngredients: (state, action) => {
      state.ingredients = action.payload;
    },
    updateCategoryId: (state, action) => {
      state.category_id = action.payload;
    },
    updateImg: (state, action) => {
      state.img = action.payload;
    },
    resetEditMenu: () => {
      return initialState;
    },
  },
});

export const {
  updateTitle,
  updateIngredients,
  updateCategoryId,
  updateImg,
  resetEditMenu,
} = editMenu.actions;

export default editMenu.reducer;
