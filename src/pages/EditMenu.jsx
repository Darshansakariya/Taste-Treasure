/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/editMenu.css";
import NavBar from "../components/Navbar";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6Im90bmllbCIsInJvbGUiOiJ1c2VycyIsImlhdCI6MTY5MTQxMTYwMX0.9gq3-EFXJLhZelTRV3H-WzsaEbaKUdec1m6YnHvuUiU";

export default function EditMenu() {
  const { id } = useParams();
  const [img, setImg] = useState(null);
  const [updateData, setUpdateData] = useState({
    title: "",
    ingredients: "",
    category_id: "",
    img: "",
  });

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
        setUpdateData({
          title: res.data.title,
          ingredients: res.data.ingredients,
          category_id: res.data.category_id,
          img: res.data.img,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();

    if (
      !updateData.title ||
      !updateData.ingredients ||
      !updateData.category_id ||
      !img
    ) {
      alert("Please fill in all the fields");
      return;
    }

    let bodyFormData = new FormData();
    bodyFormData.append("title", updateData.title);
    bodyFormData.append("ingredients", updateData.ingredients);
    bodyFormData.append("category_id", updateData.category_id);

    if (img) {
      bodyFormData.append("img", img);
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
    imagePreview.style.display = "block";

    setImg(fileInput.files[0]); // Update the image state
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    console.log(`Updating ${name} to ${value}`);

    const intValue = name === "category_id" ? parseInt(value, 10) : value;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: intValue,
    }));
  };
  return (
    <>
      <NavBar />
      <section
        className="content container-content w-100 d-flex justify-content-center"
        style={{ height: "100vh" }}
      >
        <div className="content-container w-50 d-flex flex-column">
          <form onSubmit={handleUpdate} className="addFile w-100 pt-3 rounded">
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
                value={updateData.title || ""}
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
                  value={updateData.ingredients || ""}
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
                value={updateData.category_id || "0"}
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
}
