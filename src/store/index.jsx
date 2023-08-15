import { configureStore } from "@reduxjs/toolkit";
import discoverReducer from "./../features/home";
import addMenuReducer from "./../features/addMenu"; // Impor slice yang sudah Anda buat

const store = configureStore({
  reducer: {
    home: discoverReducer,
    addMenu: addMenuReducer,
    // Tambahkan reducer lain sesuai kebutuhan halaman
  },
});

export default store;
