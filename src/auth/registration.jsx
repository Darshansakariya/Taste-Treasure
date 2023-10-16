// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./../css/register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pass: "",
  });

  const handleRegister = async () => {
    try {
      // Tambahkan role "users" dan URL gambar dari Cloudinary ke data registrasi
      const registrationData = {
        ...formData,
        role: "users",
        photos: "URL_foto_dari_Cloudinary",
      };

      // Kirim data registrasi ke server
      const response = await axios.post(
        "https://kind-gray-hippopotamus-tie.cyclic.app/users/regis",
        registrationData
      );

      // Tangani respons dari server jika diperlukan
      console.log("Registrasi berhasil", response.data);

      // Redirect atau lakukan sesuatu setelah berhasil mendaftar
      navigate("/login");
    } catch (error) {
      // Tangani kesalahan dari server atau validasi di sini
      console.error("Gagal mendaftar", error);
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
      <section className="regis container">
        <div className="content d-flex flex-column">
          <h3 className="mt-5">Recipe...</h3>
          <h3 className="mt-5">Let's Get Started !</h3>
          <p className="mb-2">Create new account to access all features</p>
          <hr className="w-60" />
          <div className="formReg">
            <div className="mb-3">
              <label htmlFor="name" className="mb-1">
                Name
              </label>
              <input
                type="email"
                className="form-control"
                id="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="mb-1">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="johndoe@gmail.com i.e"
                value={formData.email}
                onChange={handleInputChange}
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
                placeholder=""
                value={formData.pass}
                onChange={handleInputChange}
              />
            </div>
            <div className="terms">
              <div className="form-check my-2">
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
            </div>
            <button
              type="submit"
              className="buttonRegis btn btn-md w-100 custom-button"
              data-toggle="modal"
              data-target="#verifyModal"
              onClick={handleRegister}
            >
              Register Account
            </button>
            <h6 className="account mt-5 text-center">
              Already have an account ?
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
