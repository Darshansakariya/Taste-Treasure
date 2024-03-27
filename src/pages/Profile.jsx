/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import accImg from "../assets/iconComment.png";
import "../css/profile.css";
import NavBar from "../components/Navbar";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Resp from "../components/Resp";
import Alert from "./../components/Alert";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage, setData, deleteItem } from "../features/profile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Profile() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const { data, currentPage, itemsPerPage, showAlert, alertData } = useSelector(
    (state) => state.profile
  );
  const { user } = useSelector((state) => state.login);

  const fetchProfileData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("Token not found in localStorage.");
      return;
    }

    try {
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      const userId = tokenData.id;

      const url = `/api/recipe/${userId}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setData(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMenuItems = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("Token not found in localStorage.");
      return;
    }

    try {
      const response = await axios.get("/api/recipe");

      dispatch(setData(response.data));
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfileData();
    fetchMenuItems();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("Token not found in localStorage.");
      return;
    }

    try {
      // Convert the id to string if necessary
      const recipeId = typeof id === "string" ? id : String(id);

      const response = await axios.delete(`/api/recipe/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        dispatch(deleteItem(recipeId));
        toast.success("Recipe deleted successfully");
        setShowModal(false);
      } else {
        toast.error("Delete Recipe Failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete Recipe Failed");
    }
  };

  const handleNextPage = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const handlePrevPage = () => {
    dispatch(setCurrentPage(currentPage - 1));
  };

  const getBlobUrl = (data, contentType) => {
    const base64String = btoa(
      new Uint8Array(data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
    return `data:${contentType};base64,${base64String}`;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = data.slice(startIndex, endIndex);

  return (
    <>
      <NavBar />
      <ToastContainer />
      <section className="container-content w-100 ">
        {showAlert && (
          <Alert type={alertData.type} message={alertData.message} />
        )}
        <div className="row postHeader">
          {user && (
            <div className="col-md-9 d-flex align-items-center ms-5">
              <div className="block mt-1 ms-3 me-3"></div>
              <img
                style={{
                  width: "40px",
                  height: "40px",
                  overflow: "hidden",
                  borderRadius: "50%",
                }}
                src={user.photos}
                alt=""
                className="mt-1 me-2"
              />
              <div className="comment-user p-1">
                <div className="nameAcc">
                  <p className="mb-0">{user.name}</p>
                </div>
                <div className="logoutAcc">
                  <p className="font-weight-bold mb-0">{`${itemsToShow.length} Recipes`}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <div className="tabs-wrapper container row ms-3 ps-5">
        <ul className="nav nav-tabs border-0" id="recipesTab" role="tablist">
          <li className="nav-item" id="nav-item">
            <a
              className="titleTab nav-link active border-0"
              id="recipes-tab"
              data-bs-toggle="tab"
              href="#recipes"
              role="tab"
              aria-controls="recipes"
              aria-selected="true"
            >
              Recipes
            </a>
          </li>
          <li className="nav-item" id="nav-item">
            <a
              className="titleTab nav-link border-0"
              id="bookmarked-tab"
              data-bs-toggle="tab"
              href="#bookmarked"
              role="tab"
              aria-controls="bookmarked"
              aria-selected="false"
            >
              Bookmarked
            </a>
          </li>
          <li className="nav-item" id="nav-item">
            <a
              className="titleTab nav-link border-0"
              id="liked-tab"
              data-bs-toggle="tab"
              href="#liked"
              role="tab"
              aria-controls="liked"
              aria-selected="false"
            >
              Liked
            </a>
          </li>
        </ul>
        <hr className="bar w-50" />
        <div className="tab-content" id="recipesTabContent">
          <div
            className="container tab-pane fade show active"
            id="recipes"
            role="tabpanel"
            aria-labelledby="recipes-tab"
          >
            <div className="container-fluid row">
              {itemsToShow.map((recipe) => (
                <div className="content-wrapper row" key={recipe.id}>
                  <div className="content col-lg-4 col-md-5 col-sm-7 mb-5">
                    {recipe.img && (
                      <img
                        style={{
                          borderRadius: 10,
                        }}
                        src={getBlobUrl(
                          recipe.img.data,
                          recipe.img.contentType
                        )}
                        alt={recipe.title}
                        width={300}
                        height={200}
                      />
                    )}
                  </div>
                  <div className="content-title col-lg-8 col-md-7 col-sm-5">
                    <h5>{recipe.title}</h5>
                    <div>
                      <p className="mb-0">Ingredients an Recipe:</p>
                      <p>{recipe.ingredients}</p>
                    </div>
                    {/* You can remove or modify the Resp component according to your requirements */}
                    <Resp />
                    <div className="utility d-flex gap-5">
                      <div className="actions mt-4">
                        <Link
                          to={`/editMenu/${recipe.id}`}
                          className="btn-edit btn pt-2"
                        >
                          Edit Recipe
                        </Link>
                      </div>
                      <div className="actions mt-4 ps-2">
                        <button
                          className="btn-delete btn text-center pt-2"
                          onClick={() => setShowModal(true)}
                        >
                          Delete Recipe
                        </button>
                        <Modal show={showModal} centered onHide={handleClose}>
                          <Modal.Body>
                            Are you sure you want to delete this recipe?
                          </Modal.Body>
                          <Modal.Footer>
                            <button
                              style={{
                                backgroundColor: "white",
                                border: 1,
                                borderColor: "#efc81a",
                                borderRadius: 5,
                                width: 80,
                                height: 35,
                                color: "#efc81a",
                              }}
                              onClick={handleClose}
                            >
                              Cancel
                            </button>
                            <button
                              style={{
                                backgroundColor: "#e33c30",
                                border: "none",
                                borderRadius: 5,
                                width: 80,
                                height: 35,
                              }}
                              onClick={() => {
                                handleDelete(recipe._id);
                                handleClose();
                              }}
                            >
                              Delete
                            </button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pagination container-fluid mt-5 d-flex justify-content-center align-items-center">
                <div className="page-content d-flex align-items-baseline gap-2">
                  {currentPage > 1 && (
                    <button
                      className="page-prev btn btn-warning text-white"
                      onClick={handlePrevPage}
                    >
                      Prev
                    </button>
                  )}
                  <h6 className="ml-4">
                    Show {startIndex + 1}-{Math.min(endIndex, data.length)} From{" "}
                    {data.length}
                  </h6>
                  {endIndex < data.length && (
                    <button
                      className="page-next btn btn-warning text-white"
                      onClick={handleNextPage}
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="bookmarked"
            role="tabpanel"
            aria-labelledby="bookmarked-tab"
          ></div>
          <div
            className="tab-pane fade"
            id="liked"
            role="tabpanel"
            aria-labelledby="liked-tab"
          >
            <h3>Liked Content</h3>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
