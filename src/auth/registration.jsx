// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./../css/register.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validatePassword = (password) => {
    return password.length >= 6;
  };
  const handleRegister = async () => {
    // Check if the name is provided
    if (!formData.name.trim()) {
      window.alert("Please enter your name");
      return;
    }

    // Check if the email is provided and valid
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      window.alert("Please enter a valid email address");
      return;
    }

    // Check if the password is provided and meets the requirements
    if (!formData.pass.trim() || !validatePassword(formData.pass)) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    try {
      const registrationData = {
        ...formData,
        role: "users",
        photos: "URL_foto_dari_Cloudinary",
      };

      const response = await axios.post(
        "https://kind-gray-hippopotamus-tie.cyclic.app/users/regis",
        registrationData
      );

      console.log("Registration successful", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <>
      <section className="regis">
        <div className="content d-flex flex-column">
          <img src={logo} className="logo" alt="Logo" />
          <h3 className="mt-3">Lets Get you set up !</h3>
          <p className="mb-2">Create a new account to access all features</p>
          <hr className="w-60" />
          <div className="formReg">
            <div className="mb-3">
              <label htmlFor="name" className="mb-1">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="mb-1">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pass" className="mb-1">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="pass"
                placeholder="Enter new password"
                value={formData.pass}
                onChange={handleInputChange}
                required
              />
            </div>
            <button
              type="button" // Change type to button
              className="buttonRegis btn btn-md btn-warning w-100 custom-button text-white"
              data-toggle="modal"
              data-target="#verifyModal"
              onClick={handleRegister}
            >
              Register Account
            </button>
            <h6 className="account mt-5 text-center">
              Already have an account?
              <span>
                <a onClick={handleLogin} className="link">
                  &nbsp;Log in here
                </a>
              </span>
            </h6>
          </div>
        </div>
      </section>
    </>
  );
}
