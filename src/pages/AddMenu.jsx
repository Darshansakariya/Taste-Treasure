/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  setSelectedImage,
  setInputValue,
  setImg,
  resetInput,
} from "../features/addMenu";
import NavBar from "../components/Navbar";
import "../css/addMenu.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Footer from "../components/Footer";

const AddMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedImage = useSelector((state) => state.addMenu.selectedImage);
  const img = useSelector((state) => state.addMenu.img);
  const input = useSelector((state) => state.addMenu.input);
  const [imgFile, setImgFile] = useState(null);
  const previewContainerRef = useRef();

  const token = localStorage.getItem("token");
  // Make sure the token exists before using it
  if (token) {
    // Do what you need with the token
    console.log("Token:", token);
  } else {
    // Token not found in local storage, solve it according to your needs
    console.log("Token tidak ditemukan di local storage");
  }

  function previewImage(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      dispatch(setSelectedImage(imageUrl));
      setImgFile(file);
      const imageElement = document.createElement("img");
      imageElement.classList.add("img-fluid");
      imageElement.src = imageUrl;
      previewContainerRef.current.innerHTML = "";
      previewContainerRef.current.appendChild(imageElement);
    } else {
      dispatch(setSelectedImage(null));
      previewContainerRef.current.innerHTML =
        "File yang diunggah harus berupa gambar.";
    }
  }

  const onChange = (e) => {
    dispatch(setInputValue({ name: e.target.name, value: e.target.value }));
    console.log(input);
  };

  const handlePost = async (event) => {
    event.preventDefault();
    console.log(input);
    console.log(imgFile);
    if (
      !input.title ||
      !input.ingredients ||
      input.category_id === "0" ||
      !imgFile
    ) {
      alert("Please fill the form correctly");
      return;
    }

    const bodyFormData = new FormData();
    bodyFormData.append("title", input.title);
    bodyFormData.append("ingredients", input.ingredients);
    bodyFormData.append("category_id", input.category_id);
    bodyFormData.append("img", imgFile);

    try {
      const response = await axios.post(
        "https://kind-gray-hippopotamus-tie.cyclic.app/recipe",
        bodyFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      toast.success("Add Menu Successful");
      dispatch(resetInput());
      setImgFile(null);
      navigate("/profile");
    } catch (error) {
      console.error(error);
      toast.error("Add Menu Failed");
    }
  };

  return (
    <>
      <NavBar />
      <ToastContainer />
      <section
        id="content"
        className="d-flex justify-content-center"
        style={{ height: "100vh" }}
      >
        <div className="content-container w-50 h-50 d-flex flex-column">
          <form onSubmit={handlePost} className="addFile w-100 pt-3 rounded">
            <div className="addPhoto bg-light h-50 mb-2 mt-5 text-center rounded">
              <div className="upload-area">
                <div className="" ref={previewContainerRef}></div>
              </div>
              <input
                type="file"
                name="img"
                className="upload-image form-control visually-hidden"
                id="imageUpload"
                accept="image/*"
                onChange={previewImage}
              />
            </div>
            <div className="upload w-100 mb-2 p-1 text-center">
              <label htmlFor="imageUpload">Add Photo</label>
              {/* <label className="label-upload mt-2" htmlFor="imageUpload">
                Add photo
              </label> */}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Title"
                value={input.title}
                onChange={onChange}
              />
            </div>
            <div className="addIngredients w-100 mb-0 mb-md-3 pt-2 rounded">
              <div className="form-floating">
                <textarea
                  className="w-100 rounded-2 ps-3 pt-3 ms-0"
                  placeholder="Ingredients"
                  name="ingredients"
                  style={{ height: "150px" }}
                  value={input.ingredients}
                  onChange={onChange}
                ></textarea>
              </div>
            </div>
            <div className="category">
              <select
                className="selectCategory form-select w-25"
                name="category_id"
                id="floatingSelect"
                aria-label="Floating label select example"
                value={input.category_id}
                onChange={onChange}
              >
                <option value="0">Category</option>
                <option value="1">Appetizer</option>
                <option value="2">Main Course</option>
                <option value="3">Dessert</option>
              </select>
            </div>
            <div className="buttonPost mt-3 mb-5 d-flex justify-content-center align-items-center">
              <button
                type="submit"
                className="post btn w-50 rounded text-center mb-5"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddMenu;
