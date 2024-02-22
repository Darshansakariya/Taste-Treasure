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
    try {
      await dispatch(login(inputData));
      navigate("/home");
    } catch (err) {
      console.log("Oops:", err);
      // Check if the error message is related to incorrect password
      if (err.message === "Incorrect password") {
        window.alert("Enter correct password");
      } else {
        // Display an error message to the user on the UI for other errors
        window.alert("An error occurred. Please try again later.");
      }
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleForgot = () => {
    navigate("/forgot");
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
          <h6 className="forgotPass mt-3 text-left">
            Forgot your Password?
            <span>
              <a onClick={handleForgot} className="link">
                &nbsp;Click Here
              </a>
            </span>
          </h6>
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
