// eslint-disable-next-line no-unused-vars
import React from "react";
import "./../css/forgot.css";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleChangePass = () => {
    navigate("/change");
  };
  return (
    <>
      <section className="regis container">
        <div className="content d-flex flex-lg-column">
          <h3 className="mt-5">Recipe...</h3>
          <h3 className="mt-5">Forgot Password</h3>
          <p className="mb-2">Send OTP to your email</p>
          <hr className="w-60" />
          <div className="formReg">
            <div className="mb-3">
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
            <a
              onClick={handleChangePass}
              className="buttonRegis btn btn-md w-100 custom-button"
            >
              Send OTP
            </a>
            <h6 className="forgotPass mt-3 text-left">
              Remember your password ?
              <span>
                <a onClick={handleLogin} className="link">
                  &nbsp;Click Here
                </a>
              </span>
            </h6>
          </div>
        </div>
      </section>
    </>
  );
}
