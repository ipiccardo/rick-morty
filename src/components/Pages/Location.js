import React, { useState, useEffect } from "react";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import Cards from "../Cards/Cards";

const fetchResidentsData = async (url) => {
  const res = await fetch(url);
  return res.json();
};

const Location = () => {
  let [episodeId, setEpisodeId] = useState(1);
  let [info, setInfo] = useState([]);
  let [residents, setResidents] = useState([]);
  let [results, setResults] = useState([]);
  let { name, type, dimension, created } = info;
  const [allLocations, setAllLocations] = useState([]);


  const getAllLocations = async () => {
    let data = await fetch(`https://rickandmortyapi.com/api/location`).then(
      (res) => res.json()
    );
    let allData = [...data.results];
    while (data.info.next) {
      data = await fetch(data.info.next).then((res) => res.json());
      allData = [...allData, ...data.results];
    }
    setAllLocations(allData);
  };
  
  useEffect(() => {
    getAllLocations();
  }, []);
  
  let api = `https://rickandmortyapi.com/api/location/${episodeId}`;
  
  useEffect(() => {
    (async function () {
      let data = await fetch(api).then((res) => res.json());
  
      let population = data.residents;
      setResidents(population.length);
      setInfo(data);
      // setId(data.id);
  
      let a = await Promise.all(
        population.map((character) => {
          return fetchResidentsData(character);
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
      {allLocations.map(({name, id}) => {
          return (
            <Dropdown.Item key={id}>
              <ul>
                <li value={id} onClick={onChange}>
                  {name}
                </li>
              </ul>
            </Dropdown.Item>
          );
        })}
      </DropdownButton>

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
