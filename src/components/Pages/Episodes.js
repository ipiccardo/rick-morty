import React, { useState, useEffect } from "react";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import Cards from "../Cards/Cards";
import SearchEpisode from "../Search/SearchEpisode";
import "./Episodes.css";
import { Link } from "react-router-dom";

const Episodes = () => {
  let [info, setInfo] = useState([]);
  let [results, setResults] = useState([]);
  let { name, air_date, episode } = info;
  let [episodeId, setEpisodeId] = useState([1]);

  let api = `https://rickandmortyapi.com/api/episode/${episodeId}`;

  useEffect(() => {
    (async function () {
      let data = await fetch(api).then((res) => res.json());
      setInfo(data);
      setEpisodeId(data.id);

      let a = await Promise.all(
        data.characters.map((character) => {
          return fetch(character).then((res) => res.json());
        })
      );
      setResults(a);
    })();
  }, [api]);

  let onChange = (e) => {
    setEpisodeId(e.target.value);
  };

  // BOTON + INFO

  return (
    <>
      <DropdownButton
        variant="outline-secondary"
        title="Episodes"
        id="input-group-dropdown-1"
      >
        {[...Array(51).keys()].map((episodes, key) => {
          return (
            <Dropdown.Item key={key}>
              <ul>
                <li value={episodes + 1} onClick={onChange}>
                  Episode: {episodes + 1}
                </li>
              </ul>
            </Dropdown.Item>
          );
        })}
      </DropdownButton>

      <SearchEpisode setEpisodeId={setEpisodeId} />
      <div className="flex">
        <Card key={episodeId} style={{ width: "18rem" }} className="Flex">
          <Card.Body>
            <Card.Title>
              Episode {episodeId}: {name === "" ? "Unknow" : name}
            </Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush" style={{ fontSize: "1rem" }}>
            <ListGroupItem>
              Air Date: {air_date === "" ? "Unknow" : air_date}
            </ListGroupItem>
            <ListGroupItem>
              Code: {episode === "" ? "Unknow" : episode}
            </ListGroupItem>

            <button>
              <Link to={`${episodeId}`} key={episodeId}>
                + Info
              </Link>
            </button>
          </ListGroup>
        </Card>
      </div>
      <div className="flex">
        <Cards results={results} page="/" />
      </div>
    </>
  );
};

export default Episodes;
