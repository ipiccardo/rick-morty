import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const CardDetail = (page) => {
  let { id } = useParams();
  let [characterData, setCharacterData] = useState([]);

  let api = `https://rickandmortyapi.com/api/character/${id}`;

  useEffect(() => {
    (async function () {
      let data = await fetch(api).then((resp) => resp.json());
      setCharacterData(data);
    })();
  }, [api]);

  return (
    <div key={id}>
      <Card
        key={id}
        style={{
          width: "18rem",
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "100px",
          border: "solid black",
        }}
      >
        <Card.Img variant="top" src={characterData.image} />
        <Card.Body>
          <Card.Title>Name: {characterData.name}</Card.Title>
          <Card.Title>Gender: {characterData.gender}</Card.Title>
          <Card.Title>Status: {characterData.status}</Card.Title>
          <Link to={"/"} variant="primary">
            Home
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardDetail;
