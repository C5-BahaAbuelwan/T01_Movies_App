import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BsFillTrashFill } from "react-icons/bs";
import { BsFillSuitHeartFill } from "react-icons/bs";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import "./style.css";
const MovieDetails = ({ setMoviesLength }) => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState([]);
  const [idPop, setIdPop] = useState("");
  const [related, setRelated] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getMovieDetails();
    relatedMovies()
  }, []);

  const relatedMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=1bfa430aada4409bfa6a3c5528128e8a&language=en-US&page=1`
      )
      .then((result) => {
        console.log(result.data.results);
        setRelated(result.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMovieDetails = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=1bfa430aada4409bfa6a3c5528128e8a`
      )
      .then((result) => {
        console.log(result);
        setMovieDetails(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToFavorites = () => {
    console.log("aaa");
    let favMovies = localStorage.getItem("Fav")
      ? JSON.parse(localStorage.getItem("Fav"))
      : [];
    console.log(favMovies);
    favMovies.push(movieDetails);

    localStorage.setItem("Fav", JSON.stringify(favMovies));

    setMoviesLength(favMovies.length);
    console.log(favMovies);
  };

  const removeFromFavorites = () => {
    console.log("in remove");
    let favMovies = localStorage.getItem("Fav")
      ? JSON.parse(localStorage.getItem("Fav"))
      : [];

    favMovies.forEach((element, index) => {
      console.log(element.id);
      console.log(movieDetails.id);
      if (element.id === movieDetails.id) {
        console.log("in F");
        favMovies.splice(index, 1);
      }
    });

    localStorage.setItem("Fav", JSON.stringify(favMovies));
    setMoviesLength(favMovies.length);
  };
  let style = {
    backgroundImage: `url( https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  return (
    <div className="largeContainer" style={style}>
      
      <div className="MovieDetailsContainer">
        <div className="ImageContainer">
          <img
          
            className="movieImage"
            alt={movieDetails.title}
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
            
          />
        </div>
        <div className="detailsContainer">
          <div className="container1">
            <h5 className="title">{movieDetails.title}</h5>
            <div className="ButtonContainer">
              <Button
                id="addToFF"
                variant="primary"
                onClick={() => {
                  setIdPop(2);
                  handleShow();
                }}
              >
                <BsFillSuitHeartFill />
              </Button>
              {2 === idPop ? (
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add to Favorite</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are You sure to add {movieDetails.title} to Favorite list ?{" "}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      No
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        addToFavorites();
                        setShow(false);
                      }}
                    >
                      Yes
                    </Button>
                  </Modal.Footer>
                </Modal>
              ) : (
                <></>
              )}
              <Button
                variant="primary"
                id="removeToFF"
                onClick={() => {
                  setIdPop(1);
                  handleShow();
                }}
              >
                <BsFillTrashFill />
              </Button>
              {1 === idPop ? (
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add to Favorite</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are You sure to Remove {movieDetails.title} from Favorite
                    list ?{" "}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        removeFromFavorites();
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
            </div>
          </div>
          <div className="container2">
            <p className="description">{movieDetails.overview}</p>
          </div>
          <div className="container3">
            <p className="rate">Rate</p>
            <p className="MovieRate">{movieDetails.vote_average}</p>
            <p className="release">Date</p>
            <p className="releaseDate">{movieDetails.release_date}</p>
            <p className="revenue">Revenue</p>
            <p className="revenueMovie"> {movieDetails.revenue}$</p>
            <p className="Language">Language</p>
            <p className="LanguagesMovie">{movieDetails.original_language}</p>
            {/* <p className="Category">Category</p> */}
            {/* {movieDetails&&movieDetails.genres.map((element,index)=>{
              console.log(element);
              return(
                <p className="categoryMovie">{element.name}</p>
              )
            })} */}
          </div>
        </div>
      </div>
      
      <div className="relatedMovies">
      <hr/>
        <h5 className="title">Related Movies</h5>
        <div className="ContainerForRelated">
          {related&&related.map((element,index)=>{
           let star = {
            width: (element.vote_average / 10) * 220,
          };
          return(
            
            <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`}
              id={element.title}
              onClick={(e) => {
                navigate(`/movies/${element.id}`);
                window.location.reload()
              }}
            />
            <Card.Body>
              <Card.Title>{element.title}</Card.Title>

              <Card.Text>
                <div class="stars-1">
                  <span class="stars-2" style={star}></span>
                </div>
              </Card.Text>
              <Button  id="addToFav"style={{ backgroundColor:"#212529", color:"#ffffff",borderColor:"#ffffff"}}
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
        
          )
        })}
        </div>
        
      </div>
    </div>
  );
};

export default MovieDetails;
