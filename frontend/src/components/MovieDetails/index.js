import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./style.css";
const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getMovieDetails();
  }, []);

  const getMovieDetails = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=1bfa430aada4409bfa6a3c5528128e8a`
      )
      .then((result) => {
        // console.log(result.data);
        setMovieDetails(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToFavorites = () => {
    let favMovies = localStorage.getItem("Fav")
      ? JSON.parse(localStorage.getItem("Fav"))
      : [];

    favMovies.push(movieDetails);

    localStorage.setItem("Fav", JSON.stringify(favMovies));
    console.log(favMovies);
  };

  console.log(movieDetails);
  var divStyle = {
    backgroundImage:
      "url(" +
      "https://image.tmdb.org/t/p/w500/" +
      movieDetails.poster_path +
      ")",
    // width: '300px'
  };

  return (
    <div className="MovieDetailsContainer" /*  style={divStyle} */>
      {/* <img className="IMAGE" src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}/> */}
      <div className="ImageContainer">
        <img
          className="movieImage"
          alt={movieDetails.title}
          src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
        />
        <Button variant="primary" onClick={handleShow}>
          Add To Favorite
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add to Favorite</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are You sure to add {movieDetails.title} to Favorite list ?{" "}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                addToFavorites();
                setShow(false);
              }}
            >
              Sure
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="detailsContainer">
        <div className="voteContainer">
          <p className="voteCount">
            <span>Voted </span>
            {movieDetails.vote_count}
          </p>
          <p className="voteAvg">
            <span>Average Vote </span>
            {movieDetails.vote_average}
          </p>
          <p className="status">
            <span>Movie Status </span>
            {movieDetails.status}
          </p>
        </div>
        <div className="details">
          <p className="title">
            <span>Title </span>
            {movieDetails.title}
          </p>
          <p className="release_date">
            <span>Release Date </span>
            {movieDetails.release_date}
          </p>
          <p className="spoken_languages">
            <span>Languages </span>
            {movieDetails.original_language}
          </p>
          <p className="revenue">
            <span>Revenue </span>
            {movieDetails.revenue}$
          </p>
          <p className="description">
            <span>Details </span>
            {movieDetails.overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
