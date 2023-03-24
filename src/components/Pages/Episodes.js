import React, { useState, useEffect } from "react";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import Cards from "../Cards/Cards";
import "./Episodes.css";
import { Link } from "react-router-dom";

const Episodes = () => {
  let [info, setInfo] = useState([]);
  let [results, setResults] = useState([]);
  let { name, air_date, episode } = info;
  let [episodeId, setEpisodeId] = useState([1]);
  let [allEpisodes, setAllEpisodes] = useState([])
  
  let api = `https://rickandmortyapi.com/api/episode/${episodeId}`;

  let AllEpisodesPage1 = `https://rickandmortyapi.com/api/episode`
  let AllEpisodesPage2 = `https://rickandmortyapi.com/api/episode?page=2`
  let AllEpisodesPage3 = `https://rickandmortyapi.com/api/episode?page=3`
  
  
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
  
  // console.log(results, 'results')

  useEffect(() => {
    const getAllData = async () => {
      const response1 = await fetch(AllEpisodesPage1);
      const response2 = await fetch(AllEpisodesPage2);
      const response3 = await fetch(AllEpisodesPage3);
      const data1 = await response1.json();
      const data2 = await response2.json();
      const data3 = await response3.json();
      const allData = [...data1.results, ...data2.results, ...data3.results];
      setAllEpisodes(allData);
    }
    getAllData();
  }, [AllEpisodesPage1, AllEpisodesPage2, AllEpisodesPage3]);
  // BOTON + INFO



  return (
    <>
      <DropdownButton
        variant="outline-secondary"
        title="Episodes"
        id="input-group-dropdown-1"
      >
        {
          allEpisodes.map(({name, id}) => {
            return(
              <Dropdown.Item key={id}>
              <ul>
                <li value={id} onClick={onChange}>
                  Episode {id}: {name}
                </li>
              </ul>
            </Dropdown.Item>
            )
          })
        }
      </DropdownButton>

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

            <button
            >
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
