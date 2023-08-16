/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
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
import Footer from "../components/Footer";

const AddMenu = () => {
  const navigate = useNavigate();
  const previewContainerRef = useRef(null);
  const dispatch = useDispatch();
  const selectedImage = useSelector((state) => state.addMenu.selectedImage);
  const img = useSelector((state) => state.addMenu.img);
  const input = useSelector((state) => state.addMenu.input);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6Im90bmllbCIsInJvbGUiOiJ1c2VycyIsImlhdCI6MTY5MTQxMTYwMX0.9gq3-EFXJLhZelTRV3H-WzsaEbaKUdec1m6YnHvuUiU"; // Replace with your actual access token

  const handlePost = async (event) => {
    event.preventDefault();
    console.log(input);
    console.log(img);
    if (
      !input.title ||
      !input.ingredients ||
      input.category_id === "0" ||
      !input.img
    ) {
      alert("Please fill the form correctly");
      return;
    }

    const bodyFormData = new FormData();
    bodyFormData.append("title", input.title);
    bodyFormData.append("ingredients", input.ingredients);
    bodyFormData.append("category_id", input.category_id);
    bodyFormData.append("img", input.img);

    try {
      const response = await axios.post(
        "http://localhost:3000/recipe",
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
      navigate("/profile");
    } catch (error) {
      console.error(error);
      toast.error("Add Menu Failed");
    }
  };

  function previewImage(e) {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      dispatch(setSelectedImage(imageUrl));
      const imageElement = document.createElement("img");
      imageElement.classList.add("img-fluid");
      imageElement.src = imageUrl;

      previewContainerRef.current.innerHTML = "";
      previewContainerRef.current.appendChild(imageElement);
      dispatch(setImg(file));
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
                <label className="mt-2 text-dark" htmlFor="imageUpload">
                  Add photo
                </label>
                <div ref={previewContainerRef}></div>
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
