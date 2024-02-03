/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/editMenu.css";
import NavBar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import {
  updateTitle,
  updateIngredients,
  updateCategoryId,
  updateImg,
} from "../features/editMenu";

export default function EditMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [imgFile, setImgFile] = useState(null);
  const editMenu = useSelector((state) => state.editMenu);

  const previewContainerRef = useRef();
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("Token not found in localStorage.");
    return;
  }

  useEffect(() => {
    axios
      .get(`https://kind-gray-hippopotamus-tie.cyclic.app/recipe/id/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("ini response data: ", response.data.data);
        const firstItem = response.data.data[0];
        dispatch(updateTitle(firstItem.title));
        dispatch(updateIngredients(firstItem.ingredients));
        dispatch(updateCategoryId(firstItem.category_id));
        dispatch(updateImg(firstItem.img));
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
      bodyFormData.append("img", imgFile);
    }

    axios
      .put(
        `https://kind-gray-hippopotamus-tie.cyclic.app/recipe/${id}`,
        bodyFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("Updated successfully");
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to update");
      });
  };

  const previewImage = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      console.log("Image URL:", imageUrl);
      dispatch(updateImg(imageUrl));
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
    } // Update the image state
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
      <ToastContainer />
      <section
        id="container-content"
        className="content w-100 d-flex justify-content-center"
        style={{ height: "100vh" }}
      >
        <div className="content-container w-50 d-flex flex-column">
          <form onSubmit={handleUpdate} className="addFile w-100 rounded">
            <div className="addPhoto bg-light mb-2 mt-5 text-center rounded">
              <div className="upload-area">
                {/* {editMenu.img && (
                  <img
                    src={editMenu.img}
                    alt="Preview"
                    style={{ maxWidth: "50%", maxHeight: "300px" }}
                  />
                )} */}
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
            <div className="upload w-100 mb-2 p-1 text-center">
              <label htmlFor="imageUpload">Add Photo</label>
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
                <option value="1">Salad</option>
                <option value="2">Starter</option>
                <option value="3">Main Course</option>
                <option value="4">Dessert</option>
              </select>
            </div>
            <div className="buttonUpdate mt-3 mb-5 d-flex justify-content-center align-items-center">
              <button
                type="submit"
                className="update btn w-50 rounded text-center mb-5"
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
