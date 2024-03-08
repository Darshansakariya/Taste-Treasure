// eslint-disable-next-line no-unused-vars
// DetailMenu.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./../components/Navbar";
import Footer from "./../components/Footer";
import comment from "../assets/loggedin_user.png";
import bookmark from "../assets/bookmark.svg";
import like from "../assets/like.svg";
import axios from "axios";
import { addToBookmarks, addToLiked } from "../features/profile";

export default function DetailMenu() {
  const { id } = useParams();
  const [menuData, setMenuData] = useState(null);
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetching menu data from API based on id
    axios
      .get(`https://kind-gray-hippopotamus-tie.cyclic.app/recipe/id/${id}`)
      .then((response) => {
        const item = response.data.data[0];
        setMenuData(item);
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  }, [id]);

  const handleBookmark = () => {
    dispatch(addToBookmarks(menuData));
  };

  const handleLike = () => {
    dispatch(addToLiked(menuData));
  };

  if (!menuData) {
    // Show loading or message if data is being retrieved
    return <p>Loading...</p>;
  }

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
                <p className="mb-0">{menuData.author}</p>
              </div>
              <div className="AccRecipe">
                <p className="font-weight-bold mb-0">10 Recipes</p>
              </div>
            </div>
          </div>
          {/* Right section */}
          <div className="content d-flex me-5 p-1 text-right">
            <div className="comment-user">
              <div className="date">
                <p className="mb-0">21 February 2023</p>
              </div>
              <div className="likes">
                <p className="font-weight-bold mb-0">20 Likes - 2 Comments</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content section */}
      <section className="content container-fluid d-flex justify-content-center align-items-center flex-column">
        <div className="content-container mt-2">
          <h1 className="">{menuData.title}</h1>
        </div>
        <div className="thumbnail d-flex justify-content-center mt-2">
          <img
            src={menuData.img}
            className="w-50 h-25 d rounded"
            alt="image-menu"
          />
        </div>
        <div className="bookmark-like d-flex justify-content-start ps-5 mt-5 container-fluid">
          {/* Button Bookmark */}
          <button
            type="button"
            className="book btn btn-sm rounded me-2 justify-content-center"
            onClick={handleBookmark}
          >
            <img src={bookmark} alt="Bookmark" className="" />
          </button>
          {/* Button Like */}
          <button
            type="button"
            className="like btn btn-sm rounded"
            onClick={handleLike}
          >
            <img src={like} alt="Like" className="btn-icon" />
          </button>
        </div>
        <hr className="bar mt-3 mb-5" />

        {/* Comment section */}
        <section className="comment-content d-flex flex-column container-fluid pl-5">
          {/* Render ingredients */}
          <div className="content mb-4 align-items-center">
            <h3>Ingredients:</h3>
            <br />
            <p>{menuData.ingredients}</p>
          </div>
          <br />
          <h3>Reviews : </h3>
          {/* First review */}
          <div className="review-container1">
            <div className="content d-flex align-items-center">
              <img src={comment} alt="" />
              <div className="comment-user ms-2">
                <div className="comment1">
                  <h6>Jay</h6>
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
                  <h6>Rahul</h6>
                </div>
              </div>
              <div className="block ms-5 me-3"></div>
              <p className="mt-2">so simple and delicious!</p>
            </div>
          </div>
        </section>

        <hr className="bar mt-5 mb-5" />

        {/* Add comment section */}
        <div className="comment-section container-fluid pl-5">
          <textarea
            className="form-control ms-0"
            placeholder="Your comment here!"
            id="floatingTextarea2"
            style={{ height: "150px" }}
          ></textarea>
          <button
            className="send btn w-25 mt-4 mb-5 rounded text-center text-white "
            // onClick={() => addComment(commentText)}
          >
            Send a comment
          </button>
        </div>
      </section>
      <hr />
      <Footer />
    </>
  );
}
