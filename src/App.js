import React, { useState } from "react";
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
  return (
    <BrowserRouter>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route
          path="/"
          element={<Home searchInput={searchInput} setSearchInput={setSearchInput} darkMode={darkMode} setDarkMode={setDarkMode} />}
        />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/recipedetails/:id" element={<ItemCard />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
