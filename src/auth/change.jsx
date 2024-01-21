import React from "react";
import "./../css/change.css";
import { Link, useNavigate } from "react-router-dom";

export default function Change() {
  const navigate = useNavigate();

  const loginHandle = () => {
    navigate("/login");
  };
  return (
    <>
      <section className="regis container">
        <div className="content d-flex flex-lg-column">
          <h3 className="mt-5">Forgot Password</h3>
          <p className="mb-2">Send OTP to your email</p>
          <hr className="w-60" />
          <div className="formReg">
            <div className="mb-3">
              <label htmlFor="oldPass" className="mb-1">
                Old Password
              </label>
              <input
                type="password"
                className="form-control"
                id="oldPass"
                placeholder=""
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newPass" className="mb-1">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="newPass"
                placeholder=""
                required
              />
            </div>
            <button
              className="buttonRegis btn-warning btn-md w-100 custom-button"
              data-bs-toggle="modal"
              data-bs-target="#changePassModal"
            >
              Change Password
            </button>
            <h6 className="forgotPass mt-3 text-left">
              Back to edit profile ?
              <span>
                <a onClick={loginHandle} className="link">
                  &nbsp;Click Here
                </a>
              </span>
            </h6>
            {/* <!-- Modal Logout  start--> */}
            <div
              className="modal fade"
              id="changePassModal"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="changePassModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered modal-md">
                <div className="modal-content align-items-center">
                  <div className="modal-body text-center mt-5">
                    <p className="text-head font-weight-bold form-control-lg">
                      Password has been updated
                    </p>
                    <p className="font-weight-bold form-control-lg">
                      Please login again
                    </p>
                  </div>
                  <Link
                    to="/login"
                    className="activated btn custom-button"
                    data-bs-dismiss="modal"
                  >
                    OK
                  </Link>
                </div>
              </div>
            </div>
            {/* <!-- Modal Logout end --> */}
          </div>
        </div>
      </section>
    </>
  );
}
