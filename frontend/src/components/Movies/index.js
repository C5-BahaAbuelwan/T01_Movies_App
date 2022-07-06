// import axios

import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Slider from "../Slider";
import Modal from "react-bootstrap/Modal";
import { AiFillStar } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../NavBar";
import "./style.css";

const Movies = ({ setMoviesLength }) => {
  const [show, setShow] = useState(false);
  const [searchArray, setSearchArray] = useState([]);
  const [input, setInput] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  let { ids } = useParams();
  const [movies, setMovies] = useState([]);
  const [id, setId] = useState(2);
  const [idPop, setIdPop] = useState("");
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
  const addToFavorites = (element) => {
    console.log(element);
    let favMovies = localStorage.getItem("Fav")
      ? JSON.parse(localStorage.getItem("Fav"))
      : [];

    favMovies.push(element);

    localStorage.setItem("Fav", JSON.stringify(favMovies));

    setMoviesLength(favMovies.length);
    console.log(favMovies);
  };
  const searchMovies = () => {
    console.log(input);

    const search1 =
      movies &&
      movies.filter((element, index) => {
        return element.title.toLowerCase().includes(input);
      });
    // console.log(input) ;
    setSearchArray(search1);
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

  console.log(input);
  return (
    <div className="MoviesContainer">
      <Slider />
      <div className="InputSearch">
        {/* <span aria-hidden="true" class="fa fa-search fa-2x fa-search"></span> */}
        <input
          className="SearchBar"
          placeholder=" Search By Name"
          onChange={(e) => {
            setInput(e.target.value.toLowerCase());
            searchMovies();
          }}
        />
      </div>
      <div className="MoviesCard">
        <h3> 🎞 Popular Movies</h3>

        <Container>
          <Row>
            {searchArray.length
              ? searchArray &&
                searchArray.map((element, index) => {
                  let star = {
                    width: (element.vote_average / 10) * 220,
                  };

                  return (
                    <Card style={{ width: "18rem" }}>
                      <Card.Img
                        variant="top"
                        src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`}
                        id={element.title}
                        onClick={(e) => {
                          navigate(`/movies/${element.id}`);
                        }}
                      />
                      <Card.Body>
                        <Card.Title>{element.title}</Card.Title>

                        <Card.Text>
                          <div class="stars-1">
                            <span class="stars-2" style={star}></span>
                          </div>
                        </Card.Text>
                        <Button
                          variant="primary"
                          onClick={() => {
                            setIdPop(element.id);
                            handleShow();
                          }}
                        >
                          Add To Favorite
                        </Button>

                        {element.id === idPop ? (
                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Add to Favorite</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              Are You sure to add {element.title} to Favorite
                              list ?{" "}
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Close
                              </Button>
                              <Button
                                variant="primary"
                                onClick={() => {
                                  console.log(element);
                                  addToFavorites(element);
                                  setShow(false);
                                }}
                              >
                                Sure
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        ) : (
                          <></>
                        )}
                      </Card.Body>
                    </Card>
                  );
                })
              : movies &&
                movies.map((element, index) => {
                  let star = {
                    width: (element.vote_average / 10) * 220,
                  };

                  return (
                    <Card style={{ width: "18rem" }}>
                      <Card.Img
                        variant="top"
                        src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`}
                        id={element.title}
                        onClick={(e) => {
                          navigate(`/movies/${element.id}`);
                        }}
                      />
                      <Card.Body>
                        <Card.Title>{element.title}</Card.Title>

                        <Card.Text>
                          <div class="stars-1">
                            <span class="stars-2" style={star}></span>
                          </div>
                        </Card.Text>
                        <Button
                          variant="primary"
                          onClick={() => {
                            setIdPop(element.id);
                            handleShow();
                          }}
                        >
                          Add To Favorite
                        </Button>

                        {element.id === idPop ? (
                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Add to Favorite</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              Are You sure to add {element.title} to Favorite
                              list ?{" "}
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Close
                              </Button>
                              <Button
                                variant="primary"
                                onClick={() => {
                                  console.log(element);
                                  addToFavorites(element);
                                  setShow(false);
                                }}
                              >
                                Sure
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        ) : (
                          <></>
                        )}
                      </Card.Body>
                    </Card>
                  );
                })}
          </Row>
        </Container>
      </div>
      <div className="LoadMore">
        <button
          className="load"
          onClick={(e) => {
            loadMore();
          }}
        >
          loadMore
        </button>
      </div>
    </div>
  );
};

export default Movies;
