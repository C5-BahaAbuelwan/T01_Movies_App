// import axios

import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Slider from "../Slider";

import { useNavigate, useParams } from "react-router-dom";
import "./style.css";

const Movies = () => {
  const navigate = useNavigate();
  let { ids } = useParams();
  const [movies, setMovies] = useState([]);
  const [id, setId] = useState(2);

  const getMovies = () => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=1bfa430aada4409bfa6a3c5528128e8a"
      )
      .then((result) => {
 
        setMovies(result.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadMore = () => {
    console.log(id);
    setId(id + 1);
    console.log(id);
    console.log(
      `https://api.themoviedb.org/3/movie/popular?api_key=1bfa430aada4409bfa6a3c5528128e8apage=${id}`
    );
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=1bfa430aada4409bfa6a3c5528128e8a&page=${id}`
      )
      .then((result) => {
        setMovies([...movies, ...result.data.results]);
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

    <div className="MoviesContainer">
      <Slider/>
      <div className="MoviesCard">
        <Container>
          <Row>
            {movies &&
              movies.map((element, index) => {
                return (
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`}
                      id={element.title}
                      onClick={(e)=>{navigate(`/movies/${element.id}`)}}
                    />
                    <Card.Body>
                      <Card.Title>{element.title}</Card.Title>
                      <Card.Text>{element.overview}</Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </Card>
                );
              })}
          </Row>
        </Container>
      </div>
      <button
        onClick={(e) => {
          loadMore();
        }}
      >
        loadMore
      </button>
    </div>
  );
};

export default Movies;
