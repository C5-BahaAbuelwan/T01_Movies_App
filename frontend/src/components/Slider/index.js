import Carousel from 'react-bootstrap/Carousel';
import "./style.css"
function Slider() {
  return (
    <Carousel fade id="slider">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://image.tmdb.org/t/p/original/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg"
          alt="First slide" height="500"        />
        <Carousel.Caption >
          <h3 style={{color:"white", fontSize:"3rem",fontWeight:"bold"}}>Doctor Strange</h3>
          <p style={{color:"white", fontSize:"1rem",fontWeight:"bold",textOverflow:"clip",overflow:"visible",whiteSpace:"break-spaces"}}>Doctor Strange, with the help of mystical allies both old and new, traverses the mind-bending and dangerous alternate realities of the Multiverse to confront a mysterious new adversary</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://image.tmdb.org/t/p/w500/vjnLXptqdxnpNJer5fWgj2OIGhL.jpg"
          alt="Second slide" height="500" 
        />

        <Carousel.Caption>
          <h3 style={{color:"white", fontSize:"3rem",fontWeight:"bold"}}>Memory</h3>
          <p style={{color:"white", fontSize:"1rem",fontWeight:"bold",textOverflow:"clip",overflow:"visible",whiteSpace:"break-spaces"}}>Alex, an assassin-for-hire, finds that he's become a target after he refuses to complete a job for a dangerous criminal organization. With the crime syndicate and FBI in hot pursuit, Alex has the skills to stay ahead, except for one thing: he is struggling with severe memory loss, affecting his every move. Alex must question his every action and whom he can ultimately trust.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://image.tmdb.org/t/p/w500/gG9fTyDL03fiKnOpf2tr01sncnt.jpg"
          alt="Third slide" height="500" 
        />

        <Carousel.Caption>
          <h3 style={{color:"white", fontSize:"3rem",fontWeight:"bold"}}>Morbius</h3>
          <p style={{color:"white", fontSize:"1rem",fontWeight:"bold",textOverflow:"clip",overflow:"visible",whiteSpace:"break-spaces"}}>
          Dangerously ill with a rare blood disorder, and determined to save others suffering his same fate, Dr. Michael Morbius attempts a desperate gamble. What at first appears to be a radical success soon reveals itself to be a remedy potentially worse than the disease.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;