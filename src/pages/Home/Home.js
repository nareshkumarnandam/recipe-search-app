import React from "react";
import Popular from "../../components/Popular/Popular";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import './Style.css';

const Home = ({ darkMode, setDarkMode, searchInput, setSearchInput }) => {
  return (
    <div className="home">
      <Header searchInput={searchInput} setSearchInput={setSearchInput} darkMode={darkMode} setDarkMode={setDarkMode} />
      <Popular searchInput={searchInput} setSearchInput={setSearchInput} darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
};

export default Home;
