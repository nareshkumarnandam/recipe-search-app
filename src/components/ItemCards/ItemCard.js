import React, { useState, useCallback, useEffect } from "react";
import "./Style.css";
import { useLocation } from "react-router-dom";
import { fetchData } from "../../service";
import loading from '../../assets/loading.gif'

const ItemCard = () => {
  const location = useLocation();
  const recipeId = location.state?.recipeId;
  const apiKey = location.state?.apiKey;
  const [recipe, setRecipe] = useState(null);

  console.log(apiKey);

  // useEffect(() => {
  //   const fetchRecipe = async () => {
  //     const res = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`);
  //     const data = await res.json();
  //     setRecipe(data);
  //     console.log(data);
  //   };

  //   if (recipeId && apiKey) {
  //     fetchRecipe();
  //   }
  // }, [recipeId, apiKey]);

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
      {recipe.hits.map((selectedRecipe, idx) => {
    if(selectedRecipe.recipe.label === recipeId){
      console.log(selectedRecipe.recipe.label);
      return (
        
        <div className="ItemCardMain">
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
              </p>
                <br />
              <p>
                Diet labels:{" "}
                <ul>
                  {selectedRecipe.recipe.dietLabels.map((dietLabels, idx) => {
                    return <li className="dietLabelsList" key={idx}>{dietLabels}</li>;
                  })}
                </ul>{" "}
              </p>
            </div>
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
      );
    }
  })
}
    </>
  )
  
};

export default ItemCard;
