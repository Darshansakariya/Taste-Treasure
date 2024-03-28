// AppetizerPage.jsx
// eslint-disable-next-line no-unused-vars
import React from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import appimage from "./../assets/recipe pic 5.png";
import comment from "../assets/loggedin_user.png";
import "../css/DetailMenu.css";
import { useSelector } from "react-redux";
// import axios from "axios";

const AppetizerPage = () => {
  const user = useSelector((state) => state.login.user);

  return (
    <>
      <NavBar />
      {/* Content section */}
      <section className="container-fluid bg-info row content-section d-flex flex-column mt-5 ">
        {/* Post header */}
        <div className="postHeader d-flex align-items-center justify-content-between mt-5">
          {/* Left section */}
          <div className="d-flex align-items-center ms-5">
            <div className="block mt-1 ms-2 me-3"></div>
            <img src={user?.photos} alt="" className="mt-1 me-2" />
            <div className="comment-user p-1">
              <div className="nameAcc">
                <p className="mb-0">Deep Shah</p>
              </div>
              <div className="AccRecipe">
                <p className="font-weight-bold mb-0">10 Recipes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content section */}
      <section className="content container-fluid d-flex justify-content-center align-items-center flex-column">
        <div className="content-container mt-2">
          <h1 className="">Appetizer</h1>
        </div>
        <div className="thumbnail d-flex justify-content-center mt-2">
          <img
            src={appimage}
            className="w-50 h-25 d rounded"
            alt="image-menu"
          />
        </div>

        <hr className="bar mt-3 mb-5" />

        {/* Comment section */}
        <section className="comment-content d-flex flex-column container-fluid pl-5">
          {/* Render ingredients */}
          <div className="content mb-4 align-items-center">
            <h3>Ingredients and Recipe:</h3>
            <br />
            <h4>Ingredients:</h4>
            <ul>
              <li>8 bread slices</li>
              <li>4 oz butter for bread slices</li>
              <li>1 tbsp butter or oil</li>
              <li>½ tsp garlic or minced</li>
              <li>½ cup chopped onions or green chilling red</li>
            </ul>
            <br />
            <h4>Recipe</h4>
            <p>
              Spread butter on one side of each bread slice. Some minced garlic
              and chopped onions in butter or oil. Place buttered side down on a
              heated skillet, add fillings of choice, top with another bread
              slice, cook until golden brown, flip, and cook the other side
              until golden brown.
            </p>
            <br />
            <h4>Online video:</h4>
            <a
              href="https://youtu.be/WZW_iUjykBQ?si=_OBGf-nvDJTJY_Ub"
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch The Recipe Video
            </a>
          </div>

          <h3>Reviews : </h3>
          {/* First review */}
          <div className="review-container1">
            <div className="content d-flex align-items-center">
              <img src={comment} alt="" />
              <div className="comment-user ms-2">
                <div className="comment1">
                  <h6>Darshan</h6>
                </div>
              </div>
              <div className="block ms-5 me-3"></div>
              <p className="mt-2 line ">
                Wow, I just made this and it was delicious! Thanks for sharing!
              </p>
            </div>
          </div>
          {/* Second review */}
          <div className="review-container2">
            <div className="content d-flex align-items-center">
              <img src={comment} alt="" />
              <div className="comment-user ms-2">
                <div className="comment1">
                  <h6>Hit</h6>
                </div>
              </div>
              <div className="block ms-5 me-3"></div>
              <p className="mt-2">so simple and delicious!</p>
            </div>
          </div>
        </section>

        <hr className="bar mt-5 mb-5" />
      </section>
      <hr />
      <Footer />
    </>
  );
};

export default AppetizerPage;
