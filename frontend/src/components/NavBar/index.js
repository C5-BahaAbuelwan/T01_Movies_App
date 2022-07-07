import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate, useParams } from "react-router-dom";

function NavBar({ movies }) {
  const navigate = useNavigate();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand
          onClick={(e) => {
            navigate(`/`);
          }}
        >
          Baha Movies
        </Navbar.Brand>

        



        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
          <Nav.Link style={{ color: "#ffffff"}}
          onClick={() => {
            navigate("/movies/upcoming");
          }}
        >
          Upcoming Movies
        </Nav.Link>


        <NavDropdown   title="Popular"  id="collasible-nav-dropdown" >
          <NavDropdown.Item 
            onClick={(e) => {
              navigate(`/`);
            }}
          >
            Movies
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={(e) => {
              navigate(`/tvshow`);
            }}
          >
            TvShow
          </NavDropdown.Item>
        </NavDropdown>


        <NavDropdown title="TopRated" id="collasible-nav-dropdown" >
          <NavDropdown.Item id="droplisttt"
            onClick={(e) => {
              navigate("/movies/toprated");
            }}
          >
            Movies
          </NavDropdown.Item>
          <NavDropdown.Item 
            onClick={(e) => {
              navigate(`/tvShow/toprated`);
            }}
          >
            TvShow
          </NavDropdown.Item>
        </NavDropdown>
            <Button style={{backgroundColor:"#212529", border:"none" ,fontSize:"larger"}} id="favButton"
              variant="primary"
              onClick={() => {
                navigate(`/movies/favorite`);
              }}
            >
              ❤ Favorite <Badge style={{borderRadius:"4.25rem" , backgroundColor:"#212529"}} bg="info  ">{movies}</Badge>
              <span className="visually-hidden">unread messages</span>
            </Button>

            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
