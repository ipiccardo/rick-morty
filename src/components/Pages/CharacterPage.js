import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Cards from "../Cards/Cards";
import React, { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";

const CharacterPage = () => {
  let [pageNumber, setPageNumber] = useState(1);
  let [characterData, setCharacterData] = useState([]);
  const [search, setSearch] = useState("");
  let { info, results } = characterData;

  const onNext = pageNumber + 1;

  const onPrev = pageNumber - 1;

  // console.log(results);
  let api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}`;

  useEffect(() => {
    (async function () {
      let data = await fetch(api).then((resp) => resp.json());
      setCharacterData(data);
    })();
  }, [api]);

  return (
    <div className="App">
      <h1 className="text-center my-5 font">Rick And Morty App</h1>
      <div>
        <Search
          setCharacterData={setCharacterData}
          characterData={characterData}
          setSearch={setSearch}
          results={results}
          setPageNumber={setPageNumber}
        />
      </div>
      <div>
        <Pagination
          info={info}
          onNext={onNext}
          onPrev={onPrev}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
        />
      </div>
      <div className="flex">
        <Cards results={results} search={search} page="/" />
      </div>
      <div className="marginButton">
        <Pagination
          info={info}
          onNext={onNext}
          onPrev={onPrev}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
        />
      </div>
    </div>
  );
};

export default CharacterPage;
