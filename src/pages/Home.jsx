// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import React from "react";
import "./../css/home.css";
import { useDispatch, useSelector } from "react-redux";
import { setDiscoverInput } from "./../features/home";
import discoverImage from "./../assets/discover.png";
import fypImage from "./../assets/fyp.png";
import newRecipeImage from "./../assets/newRecipe.png";
import NavBar from "./../components/Navbar";
import SideBlock from "./../components/SideBlock";
import Footer from "./../components/Footer";

export default function Home() {
  const dispatch = useDispatch();
  const discoverInput = useSelector((state) => state.home.discoverInput);

  const handleDiscoverInput = (event) => {
    dispatch(setDiscoverInput(event.target.value));
  };

  return (
    <>
      <div className="primaryContainer container-fluid">
        <NavBar />
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
                <input
                  type="text"
                  className="search rounded-3 border-0"
                  placeholder="Search Restaurant, Food"
                  value={discoverInput}
                  onChange={handleDiscoverInput}
                />
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
                <img src={fypImage} width="440" alt="Popular For You !" />
              </div>
              <div className="slide2 col-md-6 d-flex align-items-center ms-5">
                <div className="wrapper">
                  <h2>
                    Healthy Bone Broth
                    <br />
                    Ramen (Quick &amp; Easy)
                  </h2>
                  <hr />
                  <h5>
                    Quick + Easy Chicken Bone Broth Ramen-
                    <br />
                    Healthy chicken ramen in a hurry? That’s right!
                  </h5>
                  <button className="learnMore mt-2 border-0 rounded-2">
                    Learn More
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
                  <img src={newRecipeImage} width="440" alt="Burger" />
                </div>
              </div>
              {/* <!-- left end --> */}
              {/* <!-- right start  --> */}
              <div className="slide2 col-6 d-flex align-items-center ms-5">
                <div className="wrapper">
                  <h2>
                    Healthy Bone Broth
                    <br />
                    Ramen (Quick &amp; Easy)
                  </h2>
                  <hr />
                  <h5>
                    Quick + Easy Chicken Bone Broth Ramen-
                    <br />
                    Healthy chicken ramen in a hurry? That’s right!
                  </h5>
                  <button className="learnMore mt-2 border-0 rounded-2">
                    Learn More
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
                <h2 className="text-lg-start">Popular Recipe</h2>
              </div>
            </div>
            <div className="content-top row">
              <div className="col-4 mt-5 d-flex justify-content-center">
                <div className="recipe1 rounded-3">
                  <p>
                    Chicken <br />
                    Kare
                  </p>
                </div>
              </div>
              <div className="col-4 mt-5 d-flex justify-content-center">
                <div className="recipe2 rounded-3">
                  <p>
                    Bomb <br />
                    Chicken
                  </p>
                </div>
              </div>
              <div className="col-4 mt-5 d-flex justify-content-center">
                <div className="recipe3 rounded-3">
                  <p>
                    Banana
                    <br />
                    Smothie Pop
                  </p>
                </div>
              </div>
              <div className="col-4 mt-5 d-flex justify-content-center">
                <div className="recipe4 rounded-3">
                  <p>
                    Coffe Lava <br />
                    Cake
                  </p>
                </div>
              </div>
              <div className="col-4 mt-5 d-flex justify-content-center">
                <div className="recipe5 rounded-3">
                  <p>
                    Sugar <br />
                    Salmon
                  </p>
                </div>
              </div>
              <div className="col-4 mt-5 d-flex justify-content-center">
                <div className="recipe6 rounded-3">
                  <p>
                    Indian
                    <br />
                    Salad
                  </p>
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
