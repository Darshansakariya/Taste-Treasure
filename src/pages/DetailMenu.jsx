// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "./../components/Navbar";
import Footer from "./../components/Footer";
import "./../css/detailMenu.css";
import axios from "axios";

export default function DetailMenu() {
  const { id } = useParams();
  const [menuData, setMenuData] = useState(null);
  const user = useSelector((state) => state.login.user);

  useEffect(() => {
    // Mengambil data menu dari API berdasarkan id
    axios
      .get(`https://kind-gray-hippopotamus-tie.cyclic.app/recipe/id/${id}`)
      .then((response) => {
        console.log("ini data dari response : ", response);
        const item = response.data.data[0];
        setMenuData(item);
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  }, [id]);

  if (!menuData) {
    // Tampilkan loading atau pesan jika data sedang diambil
    return <p>Loading...</p>;
  }

  return (
    <>
      <NavBar />
      {/* <!-- TODO content section start--> */}
      <section className="container-fluid bg-info row content-section d-flex flex-column mt-5 ">
        {/* <!-- post header start --> */}
        <div className="postHeader d-flex align-items-center justify-content-between mt-5">
          {/* <!-- Left --> */}
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

          {/* <!-- Right --> */}
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
        {/* <!-- post header end --> */}
      </section>
      {/* <!-- TODO content section end--> */}
      {/* <!-- TODO content section2 start--> */}
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
        {menuData.ingredients &&
          Array.isArray(menuData.ingredients) &&
          menuData.ingredients.length > 0 && (
            <div className="ingredients mt-3 container-fluid">
              <h3>Ingredients</h3>
              <ul className="list-unstyled">
                {menuData.ingredients.map((ingredient, index) => (
                  <li key={index}>- {ingredient}</li>
                ))}
              </ul>
            </div>
          )}

        <div className="booklike d-flex justify-content-start ps-5 mt-5 container-fluid">
          {/* <!-- Button Bookmark --> */}
          <button
            type="button"
            className="book btn btn-sm  rounded me-2 justify-content-center"
          >
            <img src="./../assets/bookmark.svg" alt="Bookmark" className="" />
          </button>

          {/* <!-- Button Like --> */}
          <button type="button" className="like btn btn-sm rounded ">
            <img src="assets/img/like.svg" alt="Like" className="btn-icon" />
          </button>
        </div>
        <hr className="bar mt-3 mb-5" />
        <section className="comment-content d-flex flex-column container-fluid pl-5">
          <div className="content d-flex mb-4 align-items-center">
            <img src="assets/img/iconComment.png" alt="" />
            <div className="comment-user ms-2">
              <div className="comment1">
                <h6>Karen</h6>
              </div>
              <div className="comment2">
                <h6 className="font-weight-bold">20 Recipes</h6>
              </div>
            </div>
            <div className="block ms-5 me-3"></div>
            <p className="mt-2">
              Wow, I just made this and it was delicious! Thanks for sharing!
            </p>
          </div>
          <div className="content d-flex align-items-center">
            <img src="assets/img/iconComment.png" alt="" />
            <div className="comment-user ms-2">
              <div className="comment1">
                <h6>Karen</h6>
              </div>
              <div className="comment2">
                <h6 className="font-weight-bold">20 Recipes</h6>
              </div>
            </div>
            <div className="block ms-5 me-3"></div>
            <p className="mt-2">so simple and delicious!</p>
          </div>
        </section>
        <hr className="bar mt-5 mb-5" />
        <div className="comment-section container-fluid pl-5">
          <textarea
            className="form-control ms-0"
            placeholder="Your comment here!"
            id="floatingTextarea2"
            style={{ height: "150px" }}
          ></textarea>
          <button className="send btn w-25 mt-4 mb-5 rounded text-center text-white ">
            Send a comment
          </button>
        </div>
      </section>
      {/* <!-- TODO content section2 end--> */}
      <hr />
      <Footer />
    </>
  );
}
