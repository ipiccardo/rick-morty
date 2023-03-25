import React from "react";
import "./Pagination.css";

const Pagination = ({ setPageNumber, onNext, onPrev, pageNumber }) => {
  //   console.log(info);
  //   console.log(pageNumber);

  const handleNext = (e) => {
    if (pageNumber === 42) return;
    setPageNumber(onNext);
  };

  const handlePrev = (e) => {
    if (pageNumber === 1) return;
    setPageNumber(onPrev);
  };

  return (
    <div className="containerButtons">
      <button className="btn btn-success" onClick={handlePrev}>
        Prev
      </button>
      <button className="btn btn-success" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
