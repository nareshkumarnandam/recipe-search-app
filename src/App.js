import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Favourites from "./components/Favourites/Favourites";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemCard from "./components/ItemCards/ItemCard";

const App = () => {
  const [searchInput, setSearchInput] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [favouritesList , setFavouritesList] = useState([]);

  useEffect(() => {
    // Load favouritesList from localStorage when component mounts
    const storedFavourites = localStorage.getItem("favouritesList");
    if (storedFavourites) {
      setFavouritesList(JSON.parse(storedFavourites));
    }
  }, [setFavouritesList]);

  useEffect(() => {
    // Save favouritesList to localStorage whenever it changes
    localStorage.setItem("favouritesList", JSON.stringify(favouritesList));
  }, [favouritesList]);

  return (
    <BrowserRouter>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route
          path="/"
          element={<Home searchInput={searchInput} setSearchInput={setSearchInput} darkMode={darkMode} setDarkMode={setDarkMode} />}
        />
        <Route path="/favourites"  element={<Favourites favouritesList={favouritesList} setFavouritesList={setFavouritesList} />} />
        <Route path="/recipedetails/:id"  element={<ItemCard favouritesList={favouritesList} setFavouritesList={setFavouritesList} />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
