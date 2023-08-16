import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import discoverReducer from "./../features/home";
import addMenuReducer from "./../features/addMenu";
import authReducer from "./../features/auth";
import profileReducer from "./../features/profile";
import editMenuReducer from "./../features/editMenu";

const middleware = [...getDefaultMiddleware(), thunk, logger];

const store = configureStore({
  reducer: {
    home: discoverReducer,
    addMenu: addMenuReducer,
    auth: authReducer,
    profile: profileReducer,
    editMenu: editMenuReducer,
  },
  middleware,
});

export default store;
