import React, { useState, useEffect, useCallback } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const EpisodesDetail = () => {
  let { episodeId } = useParams();
  let [episodeData, setEpisodeData] = useState([]);
  let { characters } = episodeData;
  const [singleCharacterData, setSingleCharacterData] = useState([]);

  const getEpisodeCharacters = useCallback(() => {
    characters?.map((people, index) => {
      return (
      async function () {
        let singlechararacter = await fetch(people).then((resp) => resp.json());
        setSingleCharacterData((singleCharacterData) => [
          ...singleCharacterData,
          singlechararacter.name,
        ]);
      })();
    });
  }, [characters]);

  useEffect(() => {
    if (episodeData) {
      getEpisodeCharacters();
    }
  }, [episodeData, getEpisodeCharacters]);

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
          <Card.Title>Characters ({singleCharacterData.length}):</Card.Title>
          {singleCharacterData.length > 1 && (
            <ul style={{ textAlign: "start", marginTop: "0.5rem" }}>
              {singleCharacterData?.map((name, index) => {
                return (
                  <li
                    key={index}
                    style={{ textAlign: "start", padding: "0.5rem" }}
                  >
                    {name}
                  </li>
                );
              })}
            </ul>
          )}
          <Link to={"/"} variant="primary">
            Home
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EpisodesDetail;
