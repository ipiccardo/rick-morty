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

const Location = () => {
  let [episodeId, setEpisodeId] = useState(1);
  let [info, setInfo] = useState([]);
  let [residents, setResidents] = useState([]);
  let [results, setResults] = useState([]);
  let { name, type, dimension, created } = info;

  let api = `https://rickandmortyapi.com/api/location/${episodeId}`;

  useEffect(() => {
    (async function () {
      let data = await fetch(api).then((res) => res.json());

      let population = data.residents;
      setResidents(population.length);
      setInfo(data);
      // setId(data.id);

      let a = await Promise.all(
        data.residents.map((character) => {
          return fetch(character).then((res) => res.json());
        })
      );
      setResults(a);
    })();
  }, [api]);

  let onChange = (e) => {
    setEpisodeId(e.target.value);
  };

  return (
    <>
      <DropdownButton variant="outline-secondary" title="Location">
        {[...Array(126).keys()].map((location, key) => {
          return (
            <Dropdown.Item key={key}>
              <ul>
                <li value={location + 1} onClick={onChange}>
                  Location: {location + 1}
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
            <Card.Title>Name: {name === "" ? "Unknow" : name}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush" style={{ fontSize: "1rem" }}>
            <ListGroupItem>Type: {type === "" ? "Unknow" : type}</ListGroupItem>
            <ListGroupItem>
              Dimension: {dimension === "" ? "Unknow" : dimension}
            </ListGroupItem>
            <ListGroupItem>Created: {created}</ListGroupItem>
            <ListGroupItem>Population: {residents}</ListGroupItem>
          </ListGroup>
        </Card>
      </div>
      <div className="flex">
        <Cards key={episodeId} results={results} page="/" />
      </div>
    </>
  );
};

export default Location;
