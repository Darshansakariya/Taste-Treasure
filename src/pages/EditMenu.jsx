/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/editMenu.css";
import NavBar from "../components/Navbar";
// import Footer from "../components/Footer";
import {
  updateTitle,
  updateIngredients,
  updateCategoryId,
  updateImg,
} from "../features/editMenu";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6Im90bmllbCIsInJvbGUiOiJ1c2VycyIsImlhdCI6MTY5MTQxMTYwMX0.9gq3-EFXJLhZelTRV3H-WzsaEbaKUdec1m6YnHvuUiU";

export default function EditMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const editMenu = useSelector((state) => state.editMenu);

  const previewContainerRef = useRef(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/recipe/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(updateTitle(res.data.data.title));
        dispatch(updateIngredients(res.data.data.ingredients));
        dispatch(updateCategoryId(res.data.data.category_id));
        dispatch(updateImg(res.data.data.img));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, id]);

  const handleUpdate = (event) => {
    event.preventDefault();

    if (
      !editMenu.title ||
      !editMenu.ingredients ||
      !editMenu.category_id ||
      !editMenu.img
    ) {
      alert("Please fill in all the fields");
      return;
    }

    let bodyFormData = new FormData();
    bodyFormData.append("title", editMenu.title);
    bodyFormData.append("ingredients", editMenu.ingredients);
    bodyFormData.append("category_id", editMenu.category_id);

    if (editMenu.img) {
      bodyFormData.append("img", editMenu.img);
    }

    axios
      .put(`http://localhost:3000/recipe/${id}`, bodyFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        alert("Updated successfully");
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to update");
      });
  };

  const previewImage = (event) => {
    const fileInput = event.target;
    const imagePreview = previewContainerRef.current; // Use the ref

    while (imagePreview.firstChild) {
      imagePreview.removeChild(imagePreview.firstChild);
    }

    const image = document.createElement("img");
    image.src = URL.createObjectURL(fileInput.files[0]);
    imagePreview.appendChild(image);
    // imagePreview.style.display = "block";

    dispatch(updateImg(fileInput.files[0])); // Update the image state
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    console.log(`Updating ${name} to ${value}`);

    if (name === "title") {
      dispatch(updateTitle(value));
    } else if (name === "ingredients") {
      dispatch(updateIngredients(value));
    } else if (name === "category_id") {
      dispatch(updateCategoryId(value));
    }
  };
  return (
    <>
      <NavBar />
      <section
        id="container-content"
        className="content w-100 d-flex justify-content-center"
        style={{ height: "100vh" }}
      >
        <div className="content-container w-50 d-flex flex-column">
          <form onSubmit={handleUpdate} className="addFile w-100 rounded">
            <div className="addPhoto bg-light mb-2 mt-5 text-center rounded">
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
                value={editMenu.title || ""}
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
                  value={editMenu.ingredients || ""}
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
                value={editMenu.category_id || "0"}
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
                Update
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
