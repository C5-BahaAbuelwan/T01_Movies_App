import { Routes, Route } from "react-router-dom";
import Button from "react-bootstrap/Button";
import NavBar from "./components/NavBar";
import Slider from "./components/Slider";
import Movies from "./components/Movies";
import MovieDetails from "./components/MovieDetails";
import { useParams } from "react-router-dom";
import Favorite from "./components/favorites";
import { useEffect, useState } from "react";
import TopRated from "./components/TopRated";
import Upcoming from "./components/UpcomingMovies";
import TvShow from "./components/TvShow";
import TopRaredTvShow from "./components/TopRatedTvShow";
import "./App.css";



function App() {

const getFav = () => {
    setMovies(
      localStorage.getItem("Fav") ? JSON.parse(localStorage.getItem("Fav")).length : 0
    );
  };

  useEffect(()=>{
    getFav()
  },[])
  const [movies, setMovies] = useState("");
  const { id } = useParams();

  return (
    <div className="App">
      <NavBar movies={movies}/>
      <Routes>
        <Route path="/" element={<Movies setMoviesLength={setMovies} />}></Route>
        <Route path="/movies/:id" element={<MovieDetails setMoviesLength={setMovies} />}></Route>
        <Route path="/movies/favorite" element={<Favorite setMoviesLength={setMovies} />}></Route>
        <Route path="/movies/toprated" element={<TopRated setMoviesLength={setMovies} />}></Route>
        <Route path="/movies/upcoming" element={<Upcoming setMoviesLength={setMovies} />}></Route>
        <Route path="/tvshow" element={<TvShow setMoviesLength={setMovies} />}></Route>
        <Route path="/tvShow/toprated" element={<TopRaredTvShow setMoviesLength={setMovies} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
