import React, { useState, useEffect } from "react";
import "./Style.css";
import logo from "../../assets/logo.png";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ darkMode, setDarkMode }) => {
  // const[darkMode, setDrakMode] = useState(false);
  const [modeIcon, setModeIcon] = useState(MdOutlineLightMode);
  const [buttonTheme, setButtonTheme] = useState("darkBtn");
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const glassEffect = scrollPosition > 80;

  const modeSwitcher = () => {
    if (darkMode === false) {
      setDarkMode(true);
      setModeIcon(MdOutlineLightMode);
      document.body.style.backgroundColor = "#1F1F1F";
      document.body.style.color = "white";
      setButtonTheme("darkBtn");
    } else {
      setDarkMode(false);
      setModeIcon(MdOutlineDarkMode);
      document.body.style.backgroundColor = "#FFFFF7";
      document.body.style.color = "black";
      setButtonTheme("lightBtn");
    }

    console.log(darkMode);
  };
  return (
    <div
      className={`navbar ${glassEffect ? "glassEffect" : ""} ${
        darkMode ? "darkNav" : "navbar"
      }`}
    >
      <div className="leftNav" onClick={() => navigate("/")}>
        <img src={logo} alt="logo" className="logo" />
        <p>
          Cook<span>Book</span>
        </p>
      </div>
      <div className="rightNav">
        <button className={buttonTheme} onClick={() => navigate("/favourites")} >
          Favourites <FaStar className="star" />
        </button>
        <button
          style={{
            border: "0",
            fontSize: "1.8rem",
            width: "50px",
            height: "100%",
            textAlign: "center",
            color: "white",
          }}
          className={buttonTheme}
          onClick={modeSwitcher}
        >
          {modeIcon}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
