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
import TvShow from "../UpcomingMovies";

const TopRaredTvShow = ({ setMoviesLength }) => {
  const [topRatedArray, setTopRatedArray] = useState([]);
  const [show, setShow] = useState(false);
  const [searchArray, setSearchArray] = useState([]);
  const [input, setInput] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  let { ids } = useParams();
  const [movies, setMovies] = useState([]);
  const [id, setId] = useState(2);
  const [tv, setTV] = useState([]);
  const [idPop, setIdPop] = useState("");

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

  const topRated = () => {
    axios
      .get(
        "https://api.themoviedb.org/3/tv/top_rated?api_key=1bfa430aada4409bfa6a3c5528128e8a&language=en-US&page=1"
      )
      .then((result) => {
        console.log(result.data.results);
        setTopRatedArray(result.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchMovies = () => {
    console.log(input);

    const search1 =
      topRatedArray &&
      topRatedArray.filter((element, index) => {
        return element.name.toLowerCase().includes(input);
      });

    setSearchArray(search1);
  };

  const loadMore = () => {
    console.log(id);
    setId(id + 1);

    axios
      .get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=1bfa430aada4409bfa6a3c5528128e8a&language=en-US&page=${id}`
      )
      .then((result) => {
        setTopRatedArray([...topRatedArray, ...result.data.results]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    topRated();
  }, []);

  return (
    <div className="TopRated">
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
        <h3> ⭐ TopRated TvShow</h3>

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
                        id={element.name}
                        onClick={(e) => {
                          navigate(`/movies/${element.id}`);
                        }}
                      />
                      <Card.Body>
                        <Card.Title>{element.name}</Card.Title>

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
                              Are You sure to add {element.name} to Favorite
                              list ?{" "}
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Close
                              </Button>
                              <Button
                                variant="primary"
                                onClick={() => {
                                  // console.log(element);
                                  addToFavorites(element);
                                  //   tvSeries();
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
              : topRatedArray &&
                topRatedArray.map((element, index) => {
                  let star = {
                    width: (element.vote_average / 10) * 220,
                  };

                  return (
                    <Card style={{ width: "18rem" }}>
                      <Card.Img
                        variant="top"
                        src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`}
                        id={element.name}
                        onClick={(e) => {
                          navigate(`/movies/${element.id}`);
                        }}
                      />
                      <Card.Body>
                        <Card.Title>{element.name}</Card.Title>

                        <Card.Text>
                          <div class="stars-1">
                            <span class="stars-2" style={star}></span>
                          </div>
                        </Card.Text>
                        <Button
                          variant="dark"
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
                              Are You sure to add {element.name} to Favorite
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
                                  //   tvSeries();
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

      {/* 
      {topRatedArray &&
        topRatedArray.map((element, index) => {
          return (
            <div>
              <h3>{element.title}</h3>
            </div>
          );
        })} */}
    </div>
  );
};

export default TopRaredTvShow;
