import React, { useEffect, useState } from 'react';
import './Style.css';
import { GoDotFill } from "react-icons/go";
import { MdStarOutline } from "react-icons/md";

const Popular = ({darkMode, setDarkMode}) => {

    const [popular, setPopular] = useState([]);

    const apiKey= 'e10f71f31ade46c091066d660f8bf3ac'
    const getPopular = async () => {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=16`);
        const data = await api.json();
        console.log(data);
        setPopular(data.recipes);
    }
useEffect( () => {
    getPopular();
}, []);
  return (
    <div className='popular'>
        {popular.map((recipe, idx) => {
            return (
                <div key={idx} className={darkMode ? 'popularCard' : 'popularCardlight'}>
                    <img className='popularImage' src={recipe.image} />
                    <p className='recipeTitle'><span className={recipe.vegetarian ? "veg" : "nonVeg"}><GoDotFill /></span>{recipe.title}</p>
                    <div className='extraInfo'>
                        <button className={darkMode ? 'favBtndark' : 'favBtn'}>View Recipe</button>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default Popular