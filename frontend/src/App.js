import { Routes, Route } from "react-router-dom";
import Button from "react-bootstrap/Button";
import NavBar from "./components/NavBar";
import Slider from "./components/Slider";
import Movies from "./components/Movies";
import MovieDetails from "./components/MovieDetails";
import { useParams } from "react-router-dom";
import Favorite from "./components/favorites";
import "./App.css";

function App() {
  const { id } = useParams();
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Movies />}></Route>
        <Route path="/movies/:id" element={<MovieDetails />}></Route>
        <Route path="/movies/favorite" element={<Favorite />}></Route>
      </Routes>
    </div>
  );
}

export default App;
