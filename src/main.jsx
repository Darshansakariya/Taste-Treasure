// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Provider } from "react-redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import discoverReducer from "./features/home";
import addMenuReducer from "./features/addMenu";
import authReducer from "./features/auth";
import profileReducer from "./features/profile";
import editMenuReducer from "./features/editMenu";
import loginReducer from "./features/login";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserList from "./components/UserList";
import Home from "./pages/Home";
import AddMenu from "./pages/AddMenu";
import Profile from "./pages/Profile";
import EditMenu from "./pages/EditMenu";
import SearchMenu from "./pages/SearchMenu";
import Login from "./auth/login";
import Register from "./auth/registration";
import Change from "./auth/change";
import DetailMenu from "./pages/DetailMenu";
import SaladPage from "./pages/SaladPage";
import AppetizerPage from "./pages/Appetizerpage";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const middleware = [...getDefaultMiddleware(), thunk, logger];

const store = configureStore({
  reducer: {
    home: discoverReducer,
    addMenu: addMenuReducer,
    auth: authReducer,
    profile: profileReducer,
    editMenu: editMenuReducer,
    login: loginReducer,
  },
  middleware,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addMenu" element={<AddMenu />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editMenu/:id" element={<EditMenu />} />
          <Route path="/search" element={<SearchMenu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/change" element={<Change />} />
          <Route path="/menu/:id" element={<DetailMenu />} />
          <Route path="/salad" element={<SaladPage />} />
          <Route path="/appetizer" element={<AppetizerPage />} />
          <Route path="UserList" element={<UserList />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  </Provider>
);
