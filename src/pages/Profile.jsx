// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import accImg from "../assets/iconComment.png";
import "../css/profile.css";
import NavBar from "../components/Navbar";
// import jwt_decode from "jwt-decode";
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
  const isoDateString = useSelector((state) => state.login.user?.created_at);
  const date = new Date(isoDateString);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate();
  const month = monthNames[date.getMonth()]; // Remember that months start at 0
  const year = date.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;
  console.log(formattedDate);

  const fetchProfileData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("Token not found in localStorage.");
      return;
    }

    try {
      //Getting user ID from token (example: token has 'id' property)
      const tokenData = JSON.parse(atob(token.split(".")[1])); // Parse data token
      const userId = tokenData.id;

      // Replace :id in the URL with the appropriate user ID
      const url = `https://kind-gray-hippopotamus-tie.cyclic.app/recipe/users/${userId}`;

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

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Handle if the token is not found
      console.log("Token not found in localStorage.");
      return;
    }
    axios
      .delete(`https://kind-gray-hippopotamus-tie.cyclic.app/recipe/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(deleteItem(id));
        toast.success("Menu deleted successfully");
        setShowModal(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Delete Menu Failed");
      });
  };

  const handleNextPage = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const handlePrevPage = () => {
    dispatch(setCurrentPage(currentPage - 1));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = data.slice(startIndex, endIndex);

  return (
    <>
      <NavBar />
      <ToastContainer />
      {/* <!-- TODO content section start--> */}
      <section className="container-content w-100 ">
        {showAlert && (
          <Alert type={alertData.type} message={alertData.message} />
        )}
        {/* <!-- post header start --> */}
        <div className="row postHeader">
          {/* <!-- Left --> */}
          {user && (
            <div className="col-md-9 d-flex align-items-center ms-5">
              <div className="block mt-1 ms-3 me-3"></div>
              <img
                style={{
                  width: "40px", // Outer div width
                  height: "40px", // Outer div height
                  overflow: "hidden", // Removes the part of the image that is outside the circle
                  borderRadius: "50%", // Create a circle effect
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

          {/* <!-- Right --> */}
          <div className="col-md-2 content pt-3 text-right">
            <div className="comment-user">
              <div className="date">
                <p className="mb-0 font-weight-bold">{formattedDate}</p>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- post header end --> */}
      </section>
      {/* <!-- TODO content section end--> */}

      {/* <!-- TODO Tab section start --> */}
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

        {/* <!-- Tab content start--> */}
        <div className="tab-content" id="recipesTabContent">
          {/* <!-- Tab Recipes start --> */}
          <div
            className="container tab-pane fade show active"
            id="recipes"
            role="tabpanel"
            aria-labelledby="recipes-tab"
          >
            {/* <!-- TODO section content start --> */}
            <div className="container-fluid row">
              {itemsToShow.map((item) => {
                return (
                  <>
                    <div className="content-wrapper row" key={item.id}>
                      <div className="content col-lg-4 col-md-5 col-sm-7 mb-5">
                        <img
                          style={{
                            borderRadius: 10,
                          }}
                          src={item.img}
                          alt="Food Image"
                          width={300}
                          height={200}
                        />
                      </div>
                      <div className="content-title col-lg-8 col-md-7 col-sm-5">
                        <h5>{item.title}</h5>
                        <div>
                          <p className="mb-0">Ingredients:</p>
                          <p>{item.ingredients}</p>
                        </div>
                        <Resp />
                        <div className="utility d-flex gap-5">
                          <div className="actions mt-4">
                            <Link
                              to={`/editMenu/${item.id}`}
                              className="btn-edit btn pt-2"
                            >
                              Edit Menu
                            </Link>
                          </div>
                          <div className="actions mt-4 ps-2">
                            <button
                              className="btn-delete btn text-center pt-2 "
                              onClick={() => setShowModal(true)}
                            >
                              Delete Menu
                            </button>
                            <Modal show={showModal} centered>
                              <Modal.Body>
                                Are you sure want to delete this recipe ?
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
                                  onClick={() => handleDelete(item.id)}
                                >
                                  Delete
                                </button>
                              </Modal.Footer>
                            </Modal>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
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
            {/* <!-- TODO section content end --> */}
          </div>

          {/* <!-- Konten Tab Bookmarked --> */}
          <div
            className="tab-pane fade"
            id="bookmarked"
            role="tabpanel"
            aria-labelledby="bookmarked-tab"
          >
            {/* <!-- TODO section content start--> */}
            {/* <div className="container-fluid row">
              {data?.map((item) => {
                return (
                  <>
                    <div className="content-wrapper row" key={item.id}>
                      <div className="content col-lg-4 col-md-5 col-sm-7 mb-5">
                        <img src={item.img} alt="Food Image" width={300} />
                      </div>
                      <div className="content-title col-lg-8 col-md-7 col-sm-5">
                        <h5>{item.title}</h5>
                        <div>
                          <p className="mb-0">Ingredients:</p>
                          <p>{item.ingredients}</p>
                        </div>
                        <Resp />
                        <div className="utility d-flex gap-5">
                          <div className="actions mt-4">
                            <Link
                              to={`/editMenu/${item.id}`}
                              className="btn-edit btn text-white pt-2"
                            >
                              Edit Menu
                            </Link>
                          </div>
                          <div className="actions mt-4">
                            <button
                              className="btn-delete btn text-center pt-2 text-white"
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete Menu
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div> */}
            {/* <!-- TODO section content end --> */}
            {/* <!-- TODO pagination start --> */}
            <div className="pagination container-fluid mt-5 d-flex justify-content-center align-items-center">
              <div className="page-content d-flex align-items-baseline">
                <button className="page-prev btn text-white">Prev</button>
                <h6 className="ml-4">Show 6-10 From 10</h6>
              </div>
            </div>
            {/* <!-- TODO pagination end -->  */}
          </div>

          {/* <!-- content Tab Liked --> */}
          <div
            className="tab-pane fade"
            id="liked"
            role="tabpanel"
            aria-labelledby="liked-tab"
          >
            <h3>Liked Content</h3>
            {/* <!-- A place to display recipe content that has been liked (liked) --> */}
          </div>
        </div>
      </div>
      {/* <!-- TODO Tab section end --> */}
      <Footer />
    </>
  );
}
