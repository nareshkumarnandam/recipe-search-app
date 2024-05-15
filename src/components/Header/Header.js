import React, { useState, useEffect } from "react";
import "./Style.css";
import ItemCard from "../ItemCards/ItemCard";
import { fetchData } from "../../service";

const Header = ({darkMode, setDarkMode, searchInput, setSearchInput}) => {
  
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState('');
  useEffect(() => {
    fetchData(searchInput).then((response) => {
        setData(response);
        console.log(response);
    })
  },[])
console.log(searchInput);
//   console.log(searchQuery);

  return (
    <>
      <div className="header">
        <h1>Your one stop guide for all the recipes</h1>
        <div className="searchDiv">
          <input
            onChange={(e) => {
                setSearchInput(e.target.value)
            }}
            value={searchInput}
            className="searchBox"
            type="text"
            placeholder="Craving something? Let's cook it up!"
          />
          {/* <button style={{ cursor: "pointer" }} onClick={() => {
            setSearchQuery(searchInput);
          }} className="searchBtn">
            Search Recipe
          </button> */}
        </div>
      </div>
      <div className={darkMode? "opacity-layer" : "opacity-layer-light"  }></div>
    </>
  );
};

export default Header;
