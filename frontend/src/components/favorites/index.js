import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./style.css";






const Favorite = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const getFav = () => {
    setMovies(
      localStorage.getItem("Fav") ? JSON.parse(localStorage.getItem("Fav")) : []
    );
  };

  useEffect(() => {
    getFav();
  }, []);
  console.log(movies);
  return (
    <div className="container">
      <h3 className="Title"> 💝Favorite List </h3>
      <div className="Favorites">
      {movies &&
        movies.map((element, index) => {
          console.log(element);
          return (
            <div className="moviesCard">
              <img
                className="imageCardFav"
                src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`}
                onClick={(e) => {
                  navigate(`/movies/${element.id}`);
                }}
              />
              {/* <p>{element.title}</p> */}
              <button className="DeleteFromFav">Delete</button>
            </div>
          );
        })}
        </div>
    </div>
  );
};

export default Favorite;
