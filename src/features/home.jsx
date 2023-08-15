import { createSlice } from "@reduxjs/toolkit";

const discoverSlice = createSlice({
  name: "home",
  initialState: {
    discoverInput: "",
  },
  reducers: {
    setDiscoverInput: (state, action) => {
      state.discoverInput = action.payload;
    },
  },
});

export const { setDiscoverInput } = discoverSlice.actions;

export default discoverSlice.reducer;
