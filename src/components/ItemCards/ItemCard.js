import React, { useState, useCallback, useEffect } from "react";
import "./Style.css";
import { useLocation } from "react-router-dom";
import { fetchData } from "../../service";
import loading from '../../assets/loading.gif'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ItemCard = ({favouritesList = [], setFavouritesList}) => {
  const location = useLocation();
  const recipeId = location.state?.recipeId;
  const apiKey = location.state?.apiKey;
  const [recipe, setRecipe] = useState(null);
  const [open, setOpen] = useState(false);

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

  console.log(apiKey);

  const addToFavorites = (recipeData) => {
    if (!favouritesList.some((fav) => fav.label === recipeData.label)) {
      setFavouritesList((prev) => [...prev, recipeData]);
      toast.success(`${recipeData.label} added to favourites`);
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetchData(recipeId);
      setRecipe(response);
      console.log(response);
    };

    if (recipeId) {
      fetchRecipe();
    }
  }, [recipeId, apiKey]);

  if (!recipe) {
    return <div className="loading"> <img src={loading} /></div>;
  }

  // console.log(recipe.hits.map((selectedRecipe, idx) => {
  //   console.log(selectedRecipe.recipe.label);
  // }));
  
  return (
    <>
     <ToastContainer />
      {recipe.hits.map((selectedRecipe, idx) => {
     if (selectedRecipe.recipe.label === recipeId) {
      const {
        label,
        image,
        cuisineType,
        dietLabels,
        healthLabels,
        ingredientLines,
        url
      } = selectedRecipe.recipe;
      console.log(selectedRecipe.recipe.label);
      return (
        
        <div key={idx} className="ItemCardMain">
          <div className="ItemCard">
            <div className="leftDiv">
              <img
                className="dishPhoto"
                src={selectedRecipe.recipe.image}
                alt={selectedRecipe.recipe.label}
              />
            </div>
            <div className="rightDiv">
              <h1>{selectedRecipe.recipe.label}</h1>
              <br />
              <div className="rightDivDetails">
              <div>
              <p>
                Cuisine:<span> </span><ul>
    
                {selectedRecipe.recipe.cuisineType.map((cuisine, idx) => {
                  return (
                    <li className="cuisineType" key={idx}>
                      {cuisine}
                    </li>
                  );
                })}
                </ul>
                <br />
              </p>
                <br />
              <p>
                Diet labels:{" "}
                <ul>
                  {selectedRecipe.recipe.dietLabels.map((dietLabels, idx) => {
                    return <li className="dietLabelsList" key={idx}>{dietLabels}</li>;
                  })}
                </ul>{" "}
                <br />
              </p>
              <br />
              </div>
              <div>
              <p>
                Meal Type:<span> </span><ul>
    
                {selectedRecipe.recipe.mealType.map((mealType, idx) => {
                  return (
                    <li className="cuisineType" key={idx}>
                      {mealType}
                    </li>
                  );
                })}
                </ul>
                <br />
              </p>
                <br />
                <p>
                More Details:
                <br />
                <a className="moreDetailsLink" href={selectedRecipe.recipe.url}>Click here for recipe</a>
                <br />
              </p>
                <br />

              </div>
              </div>
              <button className="addToFavBtn" onClick={() => addToFavorites(selectedRecipe.recipe)}>Add to favourites</button>
            </div>
            <div className="recipeDetails">
            <h1>Ingredients</h1>
            <p>
              <ul>
                {
                  selectedRecipe.recipe.ingredientLines.map((ingredientsList, idx) => {
                    return <li className="dietLabelsList" key={idx}>{ingredientsList}</li>;
                  })}
                  
              </ul>
            </p>
          </div>
          </div>
          {/* {
            open && (
              <div className="recipeDetails">
            <h1>Ingredients</h1>
            <p>
              <ul>
                {
                  selectedRecipe.recipe.ingredientLines.map((ingredientsList, idx) => {
                    return <li className="dietLabelsList" key={idx}>{ingredientsList}</li>;
                  })}
                  
              </ul>
            </p>
          </div>
            )
          } */}
        </div>
      );
    }
  })
}
    </>
  )
  
};

export default ItemCard;
