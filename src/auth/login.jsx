/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { login } from "./../store/action/login.jsx";
import "./../css/login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../assets/logo.webp";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({
    email: "",
    pass: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if email format is valid
    if (!emailRegex.test(inputData.email)) {
      window.alert("Please enter a valid email address.");
      return; // Prevent further execution
    }

    // Check if email address contains both username and domain
    const emailParts = inputData.email.split("@");
    if (
      emailParts.length !== 2 ||
      emailParts[0] === "" ||
      emailParts[1] === ""
    ) {
      window.alert("Please enter the complete email address.");
      return; // Prevent further execution
    }

    try {
      await dispatch(login(inputData));
      navigate("/home");
    } catch (err) {
      console.log("Oops:", err);
      if (err.message === "Incorrect password") {
        window.alert("Enter correct password");
      } else {
        window.alert("An error occurred. Please try again later.");
      }
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem("userData");
    // Redirect to the login page or perform any other necessary actions
    navigate("/login");
  };

  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <section className="login" id="login">
        <div className="content d-flex flex-lg-column flex-md-column">
          <img src={logo} className="logo" alt="Logo" />
          <h3 className="pt-3">Let&apos;s Get Started!</h3>
          <p className="mb-2">Log in to your existing account</p>
          <hr className="w-60" />
          <form onSubmit={handleLogin} className="formReg">
            <div className="form-group">
              <label htmlFor="email" className="mb-1">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                value={inputData.email}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="pass" className="mb-1">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Your Password"
                id="pass"
                name="pass"
                value={inputData.pass}
                onChange={onChange}
                required
              />
            </div>
            <div className="text-center mb-3"> </div>
            <button
              type="submit"
              className="buttonLogin btn-warning btn-md w-100 custom-button"
            >
              Login
            </button>
          </form>
          <h6 className="account mt-5 text-center">
            Don&apos;t have an account?
            <span>
              <a onClick={handleRegister} className="link">
                &nbsp;Sign up
              </a>
            </span>
          </h6>
        </div>
      </section>
    </>
  );
}
