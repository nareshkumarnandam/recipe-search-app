import React, { useEffect, useState } from "react";
import "./Style.css";
import { GoDotFill } from "react-icons/go";
import { MdStarOutline } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchData } from "../../service";
import { FaPizzaSlice } from "react-icons/fa6";
import { GiNoodles } from "react-icons/gi";
import { GiChickenOven } from "react-icons/gi";
import { LuDessert } from "react-icons/lu";
import loading from '../../assets/loading.gif';

const Popular = ({ darkMode, setDarkMode, searchInput, setSearchInput }) => {
  const [popular, setPopular] = useState([]);
  const [query, setQuery] = useState("popular");
  const [category , setCategory] = useState("");
  const [categoryData, setCategoryData] = useState("")
  const [data, setData] = useState("");
  const [categoryColor, setCategoryColor] = useState("rgba(233, 29, 29, 0.768)");
  const [isLoading, setIsLoading] = useState(false);
  const [popularLoading, setPopularLoading] = useState(false);


  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedCategory = localStorage.getItem("selectedCategory");
    if (storedCategory) {
      setCategory(storedCategory);
    }
  }, []);

  const handleMostLikedClick = (selectedCategory) => {
    setCategory(selectedCategory);
    setIsLoading(true);
    localStorage.setItem("selectedCategory", selectedCategory);
    // const selectedPizza = document.getElementsByClassName('pizza');
    // const selectedPasta = document.getElementsByClassName('pasta');
    // if(category === 'pizza'){
    //     selectedPizza.style.color = categoryColor;
    // }else if(category === 'pasta'){
    //     selectedPasta.style.color = categoryColor;
    // }
  };
//   useEffect(()=>{
//     if(searchInput){
//         fetchData(searchInput).then((response) => {

//         })
//     }
//   })


  useEffect(() => {
    if (category) {
        console.log(category);
        fetchData(category).then((response) => {
            setCategoryData(response);
            setIsLoading(false);
          console.log(response);
        });
      }
  }, [category]);

  useEffect(() => {
    fetchData(query).then((response) => {
      setData(response);
      setPopularLoading(false);
    //   console.log(response);
    });
  }, []);

  useEffect(() => {
    setPopularLoading(true);
    window.scrollTo(0, 0);
  }, [location]);

  //     const apiKey= '1a290473f49242838e289678d2203f48' //  1fc473a157mshd3c96db4a129ab4p14befdjsn9436757fdf1d
  //     const getPopular = async () => {
  //         const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=16`);

  //         try {

  //             const data = await api.json();
  //             console.log(data);
  //             setPopular(data.recipes);
  //         } catch (error) {
  //             console.log(error);
  //         }
  //     }
  // useEffect( () => {
  //     getPopular();
  // }, []);

  
  return (
    <div className="mainContent">
      <h1>Recipes Tailored Just for You!</h1>
      <div className="mostLiked">
        <FaPizzaSlice style={{ color: category === 'pizza' ? categoryColor : '' }} className="pizza" onClick={() => handleMostLikedClick('pizza')} />
        <GiNoodles style={{ color: category === 'pasta' ? categoryColor : '' }} className="pasta" onClick={() => handleMostLikedClick('pasta')} />
        <GiChickenOven style={{ color: category === 'chicken' ? categoryColor : '' }} className="chicken" onClick={() => handleMostLikedClick('chicken')} />
        <LuDessert  style={{ color: category === 'dessert' ? categoryColor : '' }} className="dessert" onClick={() => handleMostLikedClick('dessert')} />
        
      </div>
      {isLoading && (
        <div className="loadingCategories">
          <img src={loading} alt="Loading" />
        </div>
      )}
      <div className="categoryDisplay">
        {
            categoryData && categoryData.hits.map((item, idx) => {
                return (
                <div
                  key={idx}
                  className={darkMode ? "popularCard" : "popularCardlight"}
                >
                  <img
                    className="popularImage"
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
                      className={darkMode ? "favBtndark" : "favBtn"}
                    >
                      View Recipe
                    </button>
                  </div>
                </div>
              );
            })
        }
      </div>
      {popularLoading && (
        <div className="loadingCategories">
          <img src={loading} alt="Loading" />
        </div>
      )}
      <div className="popularDishes">
        <h1>Popular</h1>
        <div className="popular">
          {data &&
            data.hits.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className={darkMode ? "popularCard" : "popularCardlight"}
                >
                  <img
                    className="popularImage"
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
                      className={darkMode ? "favBtndark" : "favBtn"}
                    >
                      View Recipe
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Popular;
