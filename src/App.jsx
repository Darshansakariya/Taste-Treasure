// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddMenu from "./pages/AddMenu";
import Profile from "./pages/Profile";
import EditMenu from "./pages/EditMenu";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addMenu" element={<AddMenu />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editMenu/:id" element={<EditMenu />} />
        {/* <Route path="/menu" component={SearchMenu} /> */}
      </Routes>
    </Router>
  );
}

export default App;
