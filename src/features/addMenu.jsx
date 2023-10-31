import { createSlice } from "@reduxjs/toolkit";

const addMenuSlice = createSlice({
  name: "addMenu",
  initialState: {
    selectedImage: null,
    input: {
      title: "",
      ingredients: "",
      category_id: "0",
      // img: null,
    },
  },
  reducers: {
    setSelectedImage: (state, action) => {
      state.selectedImage = action.payload;
    },
    setInputValue: (state, action) => {
      const { name, value } = action.payload;
      state.input[name] = value;
    },
    setImg: (state, action) => {
      state.input.img = action.payload;
    },
    resetInput: (state) => {
      state.selectedImage = null;
      state.input = {
        title: "",
        ingredients: "",
        category_id: "0",
        img: null,
      };
    },
  },
});

export const { setSelectedImage, setInputValue, setImg, resetInput } =
  addMenuSlice.actions;

export default addMenuSlice.reducer;
