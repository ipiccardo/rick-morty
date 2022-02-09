import React from "react";
import "./search.css";

const Search = ({ setSearch, setPageNumber }) => {
  const handleChange = (e) => {
    setSearch(e.target.value);
    setPageNumber(1);
    e.preventDefault();
  };

  const handleonSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    setPageNumber(1);
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <form className="form" onSubmit={handleonSubmit}>
      <input
        className="input"
        onChange={handleChange}
        placeholder="Search your character"
        type="text"
      ></input>
      <button
        className="button Badge bg-success"
        onClick={handleOnClick}
        disabled={true}
      >
        Search
      </button>
    </form>
  );
};

export default Search;
