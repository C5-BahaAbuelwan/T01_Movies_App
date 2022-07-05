import Button from 'react-bootstrap/Button'
import NavBar from './components/NavBar';
import Slider from './components/Slider';
import Movies from './components/Movies';

import './App.css';

function App() {
  return (
    <div className="App">  
    <NavBar/>
    <Slider/>
    <Movies/>
    </div>
  );
}

export default App;
