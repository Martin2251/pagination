import React, { useState, useEffect } from "react";

function MainContent() {
  const [listMovie, setListMovie] = useState([]);
  const [nrPages, setNrPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    fetch(`http://www.omdbapi.com/?s=shrek&page=${currentPage}&apikey=24885019`)
      .then((response) => response.json())
      .then((data) => {
        setListMovie(data.Search);
        // use ceil to round up to the largest integer
        const table = Math.ceil(data.totalResults / 10);
        setNrPages(table);
        console.log(data);
      });
  }, [currentPage]);
  const pagesList = [];
  for (let i = 1; i <= nrPages; i++) {
    pagesList.push(i);
    // adds new items to the array
  }
  return (
    <div>
      <h1 className="subtitle">Shrek</h1>
      <div className="box">
        <div className="row" style={{ backgroundColor: "#3E363F" }}>
          <h4 className="col one">Title</h4>
          <h4 className="col two">Year</h4>
          <h4 className="col three">Type</h4>
        </div>

        {listMovie.map(function (film) {
          return (
            <div className="row" style={{ backgroundColor: "#FF8700" }}>
              <p className="col one">{film.Title}</p>
              <p className="col two">{film.Year}</p>
              <p className="col three">{film.Type}</p>
            </div>
          );
        })}
      </div>

      <div className="buttons">
        <button
          style={{ backgroundColor: currentPage ? "#55868C" : "#04395E" }}
          onClick={(event) => setCurrentPage(1)}
        >
          First
        </button>
        <button
          style={{ backgroundColor: currentPage ? "#55868C" : "#04395E" }}
          onClick={(event) => setCurrentPage(Math.abs(currentPage - 1))}
        >
          Prev
        </button>
        <div className="mapBtn">
          {pagesList.map((page) => {
            return (
              <button
                style={{
                  backgroundColor: page === currentPage ? "#55868C" : "#04395E",
                  fontSize: "2rem",
                }}
                onClick={(event) => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}
        </div>
        <button 
          style={{ backgroundColor: currentPage ? "#55868C" : "#04395E" }}
          onClick={(event) => setCurrentPage(Math.abs(currentPage + 1))}> Next
        </button>
        <button
          style={{ backgroundColor: currentPage ? "#55868C" : "#04395E" }}
          onClick={(event) => setCurrentPage(4)}
        >
          Last
        </button>
      </div>
    </div>
  );
}

export default MainContent;
