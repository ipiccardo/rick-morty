import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const EpisodesDetail = () => {
  let { episodeId } = useParams();
  let [episodeData, setEpisodeData] = useState([]);
  let { characters } = episodeData;

  console.log(characters);

  let api = `https://rickandmortyapi.com/api/episode/${episodeId}`;

  useEffect(() => {
    (async function () {
      let data = await fetch(api).then((resp) => resp.json());
      setEpisodeData(data);
    })();
  }, [api]);

  return (
    <div key={episodeId}>
      <Card
        key={episodeId}
        style={{
          width: "18rem",
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "50px",
          border: "solid black",
        }}
      >
        <Card.Body>
          <Card.Title>Name: {episodeData.name}</Card.Title>
          <Card.Title>Air Date: {episodeData.air_date}</Card.Title>
          <Card.Title>Code: {episodeData.episode}</Card.Title>
          <Card.Title>Characters: {characters}</Card.Title>
          {/* <Card.Title>Gender: {characterData.gender}</Card.Title>
          <Card.Title>Status: {characterData.status}</Card.Title> */}
          <Link to={"/"} variant="primary">
            Home
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EpisodesDetail;
