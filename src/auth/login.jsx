/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React from "react";
import "../css/login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleForgot = () => {
    navigate("/forgot");
  };
  return (
    <>
      <section className="regis container">
        <div className="content d-flex flex-lg-column flex-md-column">
          <h3 className="mt-5">Recipe...</h3>
          <h3 className="mt-5">Let's Get Started !</h3>
          <p className="mb-2">Log in to your existing account</p>
          <hr className="w-60" />
          <form className="formReg">
            <div className="form-group">
              <label htmlFor="email" className="mb-1">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="johndoe@gmail.com i.e"
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
                id="pass"
                placeholder=""
                required
              />
            </div>
            <div className="form-group form-check my-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="checkTerms"
              />
              <label
                className="form-check-label text-sm-left"
                htmlFor="checkTerms"
              >
                I agree to terms & conditions
              </label>
            </div>
            <button
              type="submit"
              className="buttonRegis btn-warning btn-md w-100 custom-button"
              onClick={handleLogin}
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
            Don't have an account?
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
