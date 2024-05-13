import React, { useState } from 'react';
import './Style.css';
import logo from '../../assets/logo.png';
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { FaStar } from "react-icons/fa";

const Navbar = ({darkMode, setDarkMode}) => {
    // const[darkMode, setDrakMode] = useState(false);
    const[modeIcon, setModeIcon] = useState(MdOutlineLightMode);
    const[buttonTheme, setButtonTheme] = useState("darkBtn");
    const modeSwitcher = () => {
        if(darkMode === false){
            setDarkMode(true);
            setModeIcon(MdOutlineLightMode);
            document.body.style.backgroundColor = "#000000";
            document.body.style.color = 'white';
            setButtonTheme("darkBtn");
        }else{
            setDarkMode(false);
            setModeIcon(MdOutlineDarkMode);
            document.body.style.backgroundColor = "#F8F9FD";
            document.body.style.color = 'black';
            setButtonTheme("lightBtn");
        }
        
        console.log(darkMode);
    }
  return (
    <div className={darkMode ? "darkNav" : "navbar"}>
        <div className='leftNav'>
            <img src={logo} alt='logo' className='logo' />
            <p>Cook<span>Book</span></p>
        </div>
        <div className='rightNav'>
            <button className={buttonTheme}>Favourites <FaStar className='star' /></button>
            <button style={{border: '0', fontSize: '1.8rem', width:'50px', height:'100%', textAlign:'center', color:'white'}} className={buttonTheme} onClick={modeSwitcher}>{modeIcon}</button>
        </div>
    </div>
  )
}

export default Navbar