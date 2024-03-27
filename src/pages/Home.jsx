// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import React from "react";
import "./../css/home.css";
import { useDispatch, useSelector } from "react-redux";
import { setDiscoverInput } from "./../features/home";
import discoverImage from "./../assets/recipe pic 1.png";
import mainrecipe1 from "./../assets/recipe pic 2.png";
import mainrecipe2 from "./../assets/recipe pic 3.png";
import recipe4image from "./../assets/recipe pic 4.png";
import recipe5image from "./../assets/recipe pic 5.png";
import recipe6image from "./../assets/recipe pic 6.png";
import recipe7image from "./../assets/recipe pic 7.png";
import recipe8image from "./../assets/recipe pic 8.png";
import recipe9image from "./../assets/recipe pic 9.png";
import recipe10image from "./../assets/recipe pic 10.png";
import recipe11image from "./../assets/recipe pic 11.png";
import { Link } from "react-router-dom";
import NavBar from "./../components/Navbar";
// import SideBlock from "./../components/SideBlock";
import Footer from "./../components/Footer";

export default function Home() {
  const dispatch = useDispatch();
  const discoverInput = useSelector((state) => state.home.discoverInput);

  const handleDiscoverInput = (event) => {
    const searchQuery = event.target.value.trim();
    dispatch(setDiscoverInput(searchQuery));
  };
  return (
    <>
      <div className="primaryContainer container-fluid">
        <NavBar />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* <!-- TODO Section Discover start --> */}
        <section id="discover">
          <div className="container">
            <div className="content1 row">
              <div className="slide1 col-md-7 d-flex flex-column justify-content-center">
                <section>
                  <h1>
                    Discover Recipe <br />& Delicious Food
                  </h1>
                </section>
              </div>
              <div className="slide2 col-md-5">
                <img className="rounded-4" src={discoverImage} alt="discover" />
              </div>
            </div>
          </div>
        </section>

        {/* <!-- TODO Section Discover end --> */}
        {/* <!-- TODO Section Popular start --> */}
        <section id="popular">
          <div className="container">
            <div className="row">
              <div className="pageTitle col d-flex align-items-center mb-5 ms-0">
                <div className="block"></div>
                <h2 className="text-start">Popular For You !</h2>
              </div>
            </div>
            <div className="row">
              {/* <!-- dot 6 --> */}
              <div className="slide1">
                <div className="circle position-absolute">
                  <div className="circle1">
                    <div className="circle-round rounded-circle"></div>
                    <div className="circle-round rounded-circle"></div>
                    <div className="circle-round rounded-circle"></div>
                  </div>
                  <div className="circle2">
                    <div className="circle-round rounded-circle"></div>
                    <div className="circle-round rounded-circle"></div>
                    <div className="circle-round rounded-circle"></div>
                  </div>
                </div>
              </div>
              {/* <!-- dot 6 end --> */}
              <div className="image2 col-md-5">
                <img src={mainrecipe1} width="440" alt="Popular For You !" />
              </div>
              <div className="slide2 col-md-6 d-flex align-items-center ms-5">
                <div className="wrapper">
                  <h2>
                    Healthy Bites:
                    <br />
                    Nourishing Sandwich Creations
                  </h2>
                  <hr />
                  <h5 style={{ fontFamily: "Arial, sans-serif" }}>
                    “Quick + Easy Veggie Delight Sandwich -
                    <br />
                    Elevate Your Lunch in Minutes!“
                  </h5>
                  <button className="learnMore mt-2 border-0 rounded-2">
                    <a
                      href="https://youtu.be/BlzJzavriHw?si=gEnwrWyMcyVUQ2jl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none text-white"
                    >
                      Learn More
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- TODO Section Popular end --> */}
        {/* <!-- TODO Section New Recipe start --> */}
        <section id="new-recipe">
          <div className="container">
            <div className="content3 row mb-5">
              <div className="pageTitle col d-flex align-items-center ms-0">
                <div className="block"></div>
                <h2 className="text-lg-start">New Recipe</h2>
              </div>
            </div>
            <div className="row">
              {/* <!-- left start --> */}
              <div className="slide1 col-5">
                <div className="sideBarLeft"></div>
                <div className="image3">
                  <img src={mainrecipe2} width="440" alt="Burger" />
                </div>
              </div>
              {/* <!-- left end --> */}
              {/* <!-- right start  --> */}
              <div className="slide2 col-6 d-flex align-items-center ms-5">
                <div className="wrapper">
                  <h2>
                    Fresh &amp; Crunchy
                    <br />
                    Salad Bliss (Healthy &amp; Easy)
                  </h2>
                  <hr />
                  <h5 style={{ fontFamily: "Arial, sans-serif" }}>
                    <q style={{ fontFamily: "Arial, sans-serif" }}>
                      Wholesome Salad Plate to
                      <br />
                      Brighten Your Mealtime!
                    </q>
                  </h5>
                  <button className="learnMore mt-2 border-0 rounded-2">
                    <a
                      href="https://youtu.be/BlzJzavriHw?si=gEnwrWyMcyVUQ2jl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none text-white"
                    >
                      Learn More
                    </a>
                  </button>
                </div>
              </div>
              {/* <!-- right end --> */}
            </div>
          </div>
        </section>
        {/* // <!-- TODO Section New Recipe end --> */}
        {/* <!-- TODO Section Top start --> */}
        <section id="top">
          <div className="container">
            <div className="row">
              <div className="pageTitle col d-flex align-items-center ms-0">
                <div className="block"></div>
                <h2 className="text-lg-start">
                  Check Out Other Recipes Of Your Favourite Category !
                </h2>
              </div>
            </div>
            <div className="content-top row">
              <div className="col-3 mt-5 d-flex justify-content-center">
                <div className="recipe1 rounded-3">
                  <img src={recipe4image} alt="Salad" width="200" />
                  <div className="salad">
                    <Link to="/salad"> Salads </Link>
                  </div>
                </div>
              </div>
              <div className="col-3 mt-5 d-flex justify-content-center">
                <div className="recipe2 rounded-3">
                  <img src={recipe5image} alt="Appetizer" width="200" />
                  <div className="appetizer"> Appetizer </div>
                </div>
              </div>
              <div className="col-3 mt-5 d-flex justify-content-center">
                <div className="recipe3 rounded-3">
                  <img src={recipe6image} alt="Main Course" width="200" />
                  <div className="maincourse"> Main Course </div>
                </div>
              </div>
              <div className="col-3 mt-5 d-flex justify-content-center">
                <div className="recipe4 rounded-3">
                  <img src={recipe7image} alt="Dessert" width="200" />
                  <div className="dessert"> Dessert </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- TODO Section Top end --> */}
        {/* <!-- TODO Section Top start --> */}
        <section id="top">
          <div className="container">
            <div className="row">
              <div className="pageTitle col d-flex align-items-center ms-0">
                <div className="block"></div>
                <h2 className="text-lg-start">Check Out By Region !</h2>
              </div>
            </div>
            <div className="content-top row">
              <div className="col-3 mt-5 d-flex justify-content-center">
                <div className="recipe1 rounded-3">
                  <img src={recipe8image} alt="Salad" width="200" />
                  <div className="gujarati"> Gujarati </div>
                </div>
              </div>
              <div className="col-3 mt-5 d-flex justify-content-center">
                <div className="recipe2 rounded-3">
                  <img src={recipe9image} alt="Appetizer" width="200" />
                  <div className="punjabi"> Punjabi </div>
                </div>
              </div>
              <div className="col-3 mt-5 d-flex justify-content-center">
                <div className="recipe3 rounded-3">
                  <img src={recipe10image} alt="Main Course" width="200" />
                  <div className="southindian"> South Indian </div>
                </div>
              </div>
              <div className="col-3 mt-5 d-flex justify-content-center">
                <div className="recipe4 rounded-3">
                  <img src={recipe11image} alt="Dessert" width="200" />
                  <div className="chinese"> Chinese </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- TODO Section Top end --> */}
      </div>
      <Footer />
    </>
  );
}
