// import axios

import axios from "axios";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  const getMovies = () => {
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?page=1&include_video=false&include_adult=f[%E2%80%A6]esc&language=en-US&api_key=1bfa430aada4409bfa6a3c5528128e8a"
      )
      .then((result) => {
        // console.log(result.data.results);
        setMovies(result.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  
  

  useEffect(() => {
    getMovies();
  }, []);
  console.log(movies);
  return (
    <div className="Movies">
      {movies &&
        movies.map((element, index) => {
          return (
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${element.backdrop_path}`}/>
              <Card.Body>
                <Card.Title>{element.title}</Card.Title>
                <Card.Text>
                  {element.overview}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          );
        })}
    </div>
  );
};

export default Movies;
