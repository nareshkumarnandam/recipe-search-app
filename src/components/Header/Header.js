import React, { useState, useEffect } from "react";
import "./Style.css";
import ItemCard from "../ItemCards/ItemCard";
import { fetchData } from "../../service";
import loading from "../../assets/loading.gif";
import { RiSearchLine } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({ darkMode, setDarkMode, searchInput, setSearchInput }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchHeading, setSearchHeading] = useState();

  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    fetchData(searchInput).then((response) => {
      setData(response);
      console.log(response);
    });
  }, []);
  console.log(searchInput);
  //   console.log(searchQuery);

  const handleSearchClick = (searchedText) => {
    setSearchQuery(searchedText);
    setIsLoading(true);
  };

  useEffect(() => {
    if (searchQuery) {
      console.log(searchQuery);
      fetchData(searchQuery).then((response) => {
        setData(response);
        setIsLoading(false);
        console.log(response);
      });
    }
  }, [searchQuery]);

  console.log(data);

  return (
    <>
      <div className="header">
        <h1>Your one stop guide for all the recipes</h1>
        <div className="searchDiv">
          <input
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            value={searchInput}
            className="searchBox"
            type="text"
            placeholder="Craving something? Let's cook it up!"
          />
          <button
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleSearchClick(searchInput);
            }}
            className="searchBtn"
          >
            <RiSearchLine />
          </button>
        </div>
      </div>
      <div className={darkMode ? "opacity-layer" : "opacity-layer-light"}></div>

      <div className="searchresultsDiv">
      {
        searchQuery && (
          <div className="searchResults">
          <h1>Your Search Results</h1>
          { isLoading ? (
            <div className="loadingResults">
              <img src={loading} alt="Loading" />
            </div>
          ) : (
            <div className="resultsDisplay">
              {data &&
                data.hits.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      className={darkMode ? "resultCard" : "resultCardlight"}
                    >
                      <img
                        className="resultImage"
                        src={item.recipe.images.SMALL.url}
                      />
                      <p className="recipeTitle">{item.recipe.label}</p>
                      {/* <br />
                              <p className='recipeTitle'>Calories: {item.recipe.calories}</p> */}
                      <div className="extraInfo">
                        <button
                          onClick={() =>
                            navigate(`/recipedetails/${item.recipe.label}`, {
                              state: {
                                recipeId: item.recipe.label,
                                apiKey: process.env.REACT_APP_APP_KEY,
                              },
                            })
                          }
                          className={darkMode ? "viewRecipedark" : "viewRecipe"}
                        >
                          View Recipe
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      ) 
      }
      </div>
    </>
  );
};

export default Header;


{/* // return (
    <>
      <div className="header">
        <h1>Your one stop guide for all the recipes</h1>
        <div className="searchDiv">
          <input
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            value={searchInput}
            className="searchBox"
            type="text"
            placeholder="Craving something? Let's cook it up!"
          />
          <button
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleSearchClick(searchInput);
            }}
            className="searchBtn"
          >
            <RiSearchLine />
          </button>
        </div>
      </div>
      <div className={darkMode ? "opacity-layer" : "opacity-layer-light"}></div>

      {searchQuery && ( // Conditional rendering based on searchQuery
        <div className="searchResults">
          <h1>Your Search Results</h1>
          {isLoading ? (
            <div className="loadingResults">
              <img src={loading} alt="Loading" />
            </div>
          ) : (
            <div className="resultsDisplay">
              {data &&
                data.hits.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      className={darkMode ? "resultCard" : "resultCardlight"}
                    >
                      <img
                        className="resultImage"
                        src={item.recipe.images.SMALL.url}
                      />
                      <p className="recipeTitle">{item.recipe.label}</p>
                      {/* <br />
                              <p className='recipeTitle'>Calories: {item.recipe.calories}</p> */}
    //                   <div className="extraInfo">
    //                     <button
    //                       onClick={() =>
    //                         navigate(`/recipedetails/${item.recipe.label}`, {
    //                           state: {
    //                             recipeId: item.recipe.label,
    //                             apiKey: process.env.REACT_APP_APP_KEY,
    //                           },
    //                         })
    //                       }
    //                       className={darkMode ? "favBtndark" : "favBtn"}
    //                     >
    //                       View Recipe
    //                     </button>
    //                   </div>
    //                 </div>
    //               );
    //             })}
    //         </div>
    //       )}
    //     </div>
    //   )}
    // </> */}