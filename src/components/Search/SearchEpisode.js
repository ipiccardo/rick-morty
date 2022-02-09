import React from "react";

const SearchEpisode = ({ setPageNumber, setId, setEpisodeId }) => {
  const handleChange = (e) => {
    setEpisodeId(e.target.value);
    setId(e.target.value);
    // setPageNumber(1);
  };

  const handleonSubmit = (e) => {
    setEpisodeId(e.target.value);
    setId(e.target.value);
    // setPageNumber(1);
  };

  const handleOnClick = (e) => {
    setEpisodeId(e.target.value);
  };

  return (
    <form className="form" onSubmit={handleonSubmit}>
      <input
        className="input"
        onChange={handleChange}
        placeholder="Search by number"
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

export default SearchEpisode;
