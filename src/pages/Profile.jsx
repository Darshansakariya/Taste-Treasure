// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import accImg from "../assets/iconComment.png";
import "../css/profile.css";
import NavBar from "../components/Navbar";
import axios from "axios";
// import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import Resp from "../components/Resp";
import Alert from "./../components/Alert";

export default function Profile() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6Im90bmllbCIsInJvbGUiOiJ1c2VycyIsImlhdCI6MTY5MTQxMTYwMX0.9gq3-EFXJLhZelTRV3H-WzsaEbaKUdec1m6YnHvuUiU";
  const [data, setData] = useState([]);
  //   const decodedToken = jwt_decode(token);
  //   const usersId = decodedToken.id;
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({
    type: "",
    message: "",
  });

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/recipe", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const deleteData = (id) => {
    axios
      .delete(`http://localhost:3000/recipe/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setAlertData({
          ...alertData,
          type: "success",
          message: "Data deleted successfully",
        });
        setShowAlert(true);
        fetchRecipes();
      })
      .catch((err) => {
        console.log(err);
        setAlertData({
          ...alertData,
          type: "danger",
          message: err.response.data.message,
        });
        setShowAlert(true);
      });
  };

  return (
    <>
      <NavBar />
      {/* <!-- TODO content section start--> */}
      <section className="container-content w-100 ">
        {showAlert && (
          <Alert type={alertData.type} message={alertData.message} />
        )}
        {/* <!-- post header start --> */}
        <div className="row postHeader">
          {/* <!-- Left --> */}
          <div className="col-md-9 d-flex align-items-center ms-5">
            <div className="block mt-1 ms-3 me-3"></div>
            <img src={accImg} alt="" className="mt-1 me-2" />
            <div className="comment-user p-1">
              <div className="nameAcc">
                <p className="mb-0">Ayudia</p>
              </div>
              <div className="logoutAcc">
                <p className="font-weight-bold mb-0">10 Recipes</p>
              </div>
            </div>
          </div>

          {/* <!-- Right --> */}
          <div className="col-md-2 content pt-3 text-right">
            <div className="comment-user">
              <div className="date">
                <p className="mb-0 font-weight-bold">21 February 2023</p>
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
          <li className="nav-item">
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
          <li className="nav-item">
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
          <li className="nav-item">
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
                              onClick={() => deleteData(item.id)}
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
            </div>
            {/* <!-- TODO section content end --> */}
            {/* <!-- TODO pagination start --> */}
            <div className="pagination container-fluid mt-5 d-flex justify-content-center align-items-center">
              <div className="page-content d-flex align-items-baseline">
                <h6 className="me-4">Show 1-5 From 20</h6>
                <button className="next-btn btn btn-warning text-white">
                  Next
                </button>
              </div>
            </div>
            {/* <!-- TODO pagination end -->  */}
          </div>

          {/* <!-- Konten Tab Bookmarked --> */}
          <div
            className="tab-pane fade"
            id="bookmarked"
            role="tabpanel"
            aria-labelledby="bookmarked-tab"
          >
            {/* <!-- TODO section content start--> */}
            <div className="container-fluid row">
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
                              onClick={() => deleteData(item.id)}
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
            </div>
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

          {/* <!-- Konten Tab Liked --> */}
          <div
            className="tab-pane fade"
            id="liked"
            role="tabpanel"
            aria-labelledby="liked-tab"
          >
            <h3>Liked Content</h3>
            {/* <!-- Tempat untuk menampilkan konten resep yang telah disukai (liked) --> */}
          </div>
        </div>
      </div>
      {/* <!-- TODO Tab section end --> */}
    </>
  );
}
