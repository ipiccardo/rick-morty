import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <div className="link">
              <Link to={"/"}>Characters</Link>
            </div>
            <div className="link">
              <Link to={"episode"}>Episodes</Link>
            </div>
            <div className="link">
              <Link to={"location"}>Locations</Link>
            </div>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
