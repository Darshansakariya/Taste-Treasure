/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "./../features/login";
import { useDispatch, useSelector } from "react-redux";
import "../componentsCSS/Navbar.css";
import accImg from "../assets/loggedin_user.png";
import LogoutModal from "./../components/LogoutModal";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [activePage, setActivePage] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [navbarColor, setNavbarColor] = useState("#efc81a");

  // Using useSelector to retrieve user information from Redux store
  const user = useSelector((state) => state.login.user);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 0) {
        navbar.classList.add("navbar-scrolled");
      } else {
        navbar.classList.remove("navbar-scrolled");
      }
      if (activePage === "SearchMenu") {
        setNavbarColor("fffff");
      } else {
        setNavbarColor("efc81a");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleActivePage = (pageName) => {
    setActivePage(pageName);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");

    // Dispatch logout action
    dispatch(logout());

    // Navigate to login page
    navigate("/login");
    console.log("Logout clicked!");
  };

  const handleProfileClick = () => {
    console.log("Profile clicked!");
    navigate("/profile");
  };

  // Remove the parentheses () in onClick function
  const navbarBack = () => {
    let navbar = document.querySelector(".navbar");
    navbar.classList.toggle("navbar-scrolled");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light --bs-light-text-emphasis fixed-top ${
        activePage === "" ? "navbar-scrolled" : ""
      }`}
      style={{ backgroundColor: navbarColor }} // Set background color dynamically
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <div className="containerNav container-fluid mt-3 px-5">
        <div className="burger">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={navbarBack}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mt-2 mb-lg-0">
              <li
                className={`nav-item me-5 ${
                  location.pathname === "/home" ? "active" : ""
                }`}
              >
                <Link
                  className="nav-link"
                  to="/home"
                  onClick={() => handleActivePage("home")}
                >
                  Home
                </Link>
              </li>
              <li
                className={`nav-item me-5 ${
                  location.pathname === "/addMenu" ? "active" : ""
                }`}
              >
                <Link
                  className="nav-link"
                  to="/addMenu"
                  onClick={() => handleActivePage("AddMenu")}
                >
                  Add Menu
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/search" ? "active" : ""
                }`}
              >
                <Link
                  className="nav-link"
                  to="/search"
                  onClick={() => handleActivePage("SearchMenu")}
                >
                  Search Menu
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="user d-flex align-items-center">
          <div
            className="photo me-4"
            style={{
              width: "40px", // Width of the outer div
              height: "40px", // The height of the outer div
              overflow: "hidden", // Removes the part of the image that is outside the circle
              borderRadius: "50%", // Create a circle effect
            }}
          >
            <img
              src={user?.photos || accImg}
              alt="Search"
              width="40"
              height="40"
              onClick={handleProfileClick}
              style={{
                borderRadius: "20%", // Set border-radius 50% to make the image round
                cursor: "pointer", // Added a pointer cursor to indicate that the image is clickable
              }}
            />
          </div>
          <div className="text">
            <p className="mb-0">{user?.name || "Ayudia"}</p>
            <p className="mb-0">
              <a
                href="#"
                className="text-dark"
                onClick={() => setShowLogoutModal(true)}
              >
                <strong>Logout</strong>
              </a>
            </p>
          </div>
        </div>
        <div>
          <LogoutModal
            show={showLogoutModal}
            onHide={() => setShowLogoutModal(false)}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
