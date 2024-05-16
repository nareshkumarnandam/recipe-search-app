import React from "react";
import "./Style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiDish } from "react-icons/bi";

const Favourites = ({ favouritesList, setFavouritesList }) => {
  const removeFromFavorites = (index) => {
    setFavouritesList((prev) => {
      const newList = [...prev];
      const removedRecipe = newList.splice(index, 1)[0]; // Remove the recipe and get the removed recipe
      toast.success(`${removedRecipe.label} removed from favourites`);
      return newList;
    });
  };
  console.log(favouritesList);
  return (
    <div className="favouritePage">
      <ToastContainer />
      <h1>Treasury of Taste</h1>
      {favouritesList.length === 0 ? (
        <div className="noFavDiv">
          <BiDish />
          <p>No Favourites found</p>
        </div>
      ) : (
        favouritesList.map((favRecipe, idx) => {
          console.log(favRecipe);
          // console.log(favRecipe.idx);
          return (
            <div key={idx} className="favItem">
              <img src={favRecipe.image} />
              <div>
                <h3>{favRecipe.label}</h3>
                <br />
                <br />
                <p>
                  Cuisine:<span> </span>
                  <ul className="cuisineList">
                    {favRecipe.cuisineType.map((cuisine, idx) => {
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
              </div>
              <div className="optionsColumn">
                <a href={favRecipe.url}>Get full recipe</a>
                <br />
                <button onClick={() => removeFromFavorites(idx)}>
                  Remove from favourites
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Favourites;
