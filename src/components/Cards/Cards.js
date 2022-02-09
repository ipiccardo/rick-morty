import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Cards.css";

const Cards = ({ results, search, page }) => {
  let display;

  if (results) {
    display = results.map((element) => {
      let { id, name, gender, image, location, episode, status } = element;
      const randomNumber = Math.floor(Math.random() * episode.length);
      const randomEpisode = episode[randomNumber];

      return (
        <Card key={id} style={{ width: "18rem" }} className="flexCard">
          <Link
            to={`${page} ${id}`}
            key={id}
            style={{ color: "black", textDecoration: "none" }}
          >
            <Card.Img variant="top" src={image} alt={name} />
            <Card.Body>
              <Card.Title>{name}</Card.Title>
            </Card.Body>
          </Link>
          <ListGroup className="list-group-flush" style={{ fontSize: "1rem" }}>
            <ListGroupItem>{gender}</ListGroupItem>
            <ListGroupItem>{location.name}</ListGroupItem>
            <ListGroupItem>Random Episode: {randomEpisode}</ListGroupItem>
          </ListGroup>
          {(() => {
            if (status === "Dead") {
              return <div className="Badge bg-danger status">{status}</div>;
            } else if (status === "Alive") {
              return <div className="Badge bg-success status">{status}</div>;
            } else {
              return <div className="Badge bg-secondary status">{status}</div>;
            }
          })()}
        </Card>
      );
    });
  } else {
    display = `No characters Found with the Name: ${search}`;
  }

  return <>{display}</>;
};

export default Cards;
