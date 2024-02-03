// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import React from "react";
import "./App.css";
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
import ForgotPassword from "./auth/forgot";
import Change from "./auth/change";
import DetailMenu from "./pages/DetailMenu";

function App() {
  return (
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
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/change" element={<Change />} />
          <Route path="/menu/:id" element={<DetailMenu />} />
          <Route path="UserList" element={<UserList />}></Route>
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
