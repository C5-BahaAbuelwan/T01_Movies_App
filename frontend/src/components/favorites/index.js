import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


import "./style.css";

const Favorite = ({setMoviesLength}) => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const [idPop, setIdPop] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getFav = () => {
    setMovies(
      localStorage.getItem("Fav") ? JSON.parse(localStorage.getItem("Fav")) : []
    );
  };

  const removeFromFavorites = (id) => {
    console.log("in remove");
    let favMovies = localStorage.getItem("Fav")
      ? JSON.parse(localStorage.getItem("Fav"))
      : [];

    favMovies.forEach((element, index) => {
      console.log(element.id);
      console.log(id);
      if (element.id === id) {
        console.log("in F");
        console.log(index);
        favMovies.splice(index, 1);
      }
    });
    localStorage.setItem("Fav", JSON.stringify(favMovies));
    setMoviesLength(favMovies.length);
  };

  useEffect(() => {
    getFav();
  }, [movies]);
  // console.log(movies);
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
                <Button
                  variant="primary"
                  onClick={() => {
                    setIdPop(element.id);
                    handleShow();
                  }}
                >
                  Remove From Favorite
                </Button>
                {element.id === idPop ? (
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add to Favorite</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Are You sure to Remove {element.title} from Favorite
                      list ?{" "}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          removeFromFavorites(element.id);
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
            );
          })}
      </div>
    </div>
  );
};

export default Favorite;
