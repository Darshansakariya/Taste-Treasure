// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./../css/SearchMenu.css";
import NavBar from "./../components/Navbar";
import Footer from "./../components/Footer";
import Resp from "./../components/Resp";
import axios from "axios";

const SearchMenu = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6Im90bmllbCIsInJvbGUiOiJ1c2VycyIsImlhdCI6MTY5MTQxMTYwMX0.9gq3-EFXJLhZelTRV3H-WzsaEbaKUdec1m6YnHvuUiU";
  const [data, setData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [userMap, setUserMap] = useState({});
  const [searchKeyword, setSearchKeyword] = useState(""); // State untuk kata kunci pencarian
  const [searchResults, setSearchResults] = useState([]); // State untuk hasil pencarian
  const [totalPages, setTotalPages] = useState(0);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/recipe", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const recipesData = response.data.data;

      // Collect unique users_id values
      const uniqueUsersIds = [
        ...new Set(recipesData.map((item) => item.users_id)),
      ];

      // Fetch user data for each unique users_id
      const usersDataPromises = uniqueUsersIds.map(async (userId) => {
        try {
          const userResponse = await axios.get(
            `http://localhost:3000/users/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          return {
            id: userId,
            name: userResponse.data.name,
            photos: userResponse.data.photos,
          };
        } catch (error) {
          console.log(`Error fetching user data for user ID ${userId}:`, error);
          return null;
        }
      });

      // Wait for all user data promises to resolve
      const usersData = await Promise.all(usersDataPromises);

      // Create a mapping of users_id to user data
      const userMap = {};
      usersData.forEach((userData) => {
        if (userData) {
          userMap[userData.id] = userData;
        }
      });

      // Set the state for userMap and recipes data
      setUserMap(userMap);
      setData(recipesData);
      setTotalPages(Math.ceil(recipesData.length / itemsPerPage));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:3000/recipe", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);

      const searchData = response.data.data;

      // Filter data berdasarkan kata kunci pencarian
      const filteredData = searchData.filter((item) => {
        return (
          item.title.toLowerCase().includes(searchKeyword.toLowerCase()) &&
          item.category.toLowerCase().includes(searchKeyword.toLowerCase()) &&
          item.author.toLowerCase().includes(searchKeyword.toLowerCase()) &&
          item.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(searchKeyword.toLowerCase())
          )
        );
      });

      // Simpan hasil pencarian ke dalam state
      setSearchResults(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeywordChange = (e) => {
    setSearchKeyword(e.target.value);
    setSearchResults([]); // Membersihkan hasil pencarian
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getItemsForPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Menambahkan filter pencarian
    const filteredData = data.filter((item) =>
      item.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    return filteredData.slice(startIndex, endIndex);
  };
  return (
    <>
      <div className="primary">
        <NavBar />
        {/* <!-- colorbox start--> */}
        {/* <div className="accentBlock"></div> */}
        {/* <!-- colorbox end --> */}
        {/* <!-- TODO section search start --> */}
        <section className="discover">
          <div className="slide1 mt-4 ms-5">
            <section>
              <h1>
                Discover Recipe <br />& Delicious Food
              </h1>
            </section>
            <div className="searchBar d-flex">
              <input
                type="text"
                className="search col-4 ps-5 border-0 font-weight-normal"
                value={searchKeyword}
                placeholder="Telur Gulung"
                onChange={handleKeywordChange}
              />
              <button
                id="srcMenu"
                href="#"
                className="srcMenu btn ms-3 col-1 d-flex align-items-center justify-content-center"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
            <div className="filter d-flex mt-3">
              <button
                id="srcNew"
                href="#"
                className="srcNew btn col-1 d-flex align-items-center justify-content-center"
              >
                New
              </button>
              <button
                id="srcPopular"
                href="#"
                className="srcPopular btn ms-3 col-1 d-flex align-items-center justify-content-center"
              >
                Popular
              </button>
              <button
                id="srcVegetarian"
                href="#"
                className="srcVegetarian btn ms-3 col-1 d-flex align-items-center justify-content-center"
              >
                Vegetarian
              </button>
              <button
                id="srcBreakfast"
                href="#"
                className="srcBreakfast btn ms-3 col-1 d-flex align-items-center justify-content-center"
              >
                Breakfast
              </button>
            </div>
          </div>
        </section>
        {/* <!-- TODO section search end --> */}
        {/* <!-- TODO section content start --> */}
        <div className="content-wrapper container-fluid d-flex mb-0">
          <div className="container menu-content-pic d-flex flex-column mt-5 ms-5">
            {(searchResults.length > 0 ? searchResults : getItemsForPage()).map(
              (item) => {
                return (
                  <>
                    <div className=" content-wrapper row mb-5" key={item.id}>
                      <div className="content col-lg-4 col-md-5 col-sm-7 mb-5">
                        <img
                          id="food-image"
                          src={item.img}
                          alt="Food Image"
                          onClick={() => navigate(`/menu/${item.id}`)} // Menggunakan item._id
                          style={{ cursor: "pointer" }} // Mengubah kursor saat mengarahkan ke gambar
                        />
                      </div>
                      <div className="content-title col-lg-8 col-md-7 col-sm-5">
                        <h5>{item.title}</h5>
                        <div>
                          <p className="mb-0">Ingredients:</p>
                          <p>{item.ingredients}</p>
                        </div>
                        <Resp />
                        <div className="d-flex mt-4 align-items-center">
                          <div className="round-image">
                            <img src={item.author_pic} alt="" />
                          </div>
                          <h6>{item.author}</h6>
                        </div>
                      </div>
                    </div>
                  </>
                );
              }
            )}
          </div>
        </div>
        {/* <!-- TODO section content end --> */}
        <div className="container-fluid pagination justify-content-center row mb-5">
          <button
            id="btn-prev"
            className="btn btn-warning btn-prev col-lg-1"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="col-lg-2  text-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            id="btn-next"
            className="btn btn-warning btn-next col-lg-1"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default SearchMenu;
