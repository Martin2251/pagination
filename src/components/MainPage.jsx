import React, { useState, useEffect } from "react";
import styled from "styled-components";

function MainPage() {
  const [listMovie, setListMovie] = useState([]);
  // the movies the set allows you to store it
  const [aBPages, setAbPages] = useState(0);
  // pages
  const [currentPage, setCurrentPage] = useState(1);
  //pages going through start at 1 because of a page
  const [searchMovie, setMovie] = useState("shrek");

  useEffect(() => {
    fetch(
      `http://www.omdbapi.com/?s=${searchMovie}&page=${currentPage}&apikey=24885019`
    )
      .then((response) => response.json())
      .then((data) => {
        setListMovie(data.Search);
        // use ceil to round up to the largest integer and return back 10 results
        const table = Math.ceil(data.totalResults / 10);
        setAbPages(table);
        console.log(data);
      });
  }, [currentPage]);

  const pagesList = [];
  for (let i = 1; i <= aBPages; i++) {
    pagesList.push(i);
    // adds new items to the array
    // I need a for loop to go through it
    // returns back information from the API
    // abs returns the absolute value of a number
    //film is what i want to pass into the function
  }
  // now needs a function to search the movies
  function getMovies(event) {
    fetch(
      `http://www.omdbapi.com/?s=${searchMovie}&page=${currentPage}&apikey=24885019`
    )
      .then((response) => response.json())

      .then((data) => {
        setListMovie(data.search);
        const table = Math.ceil(data.totalResults / 10);
        setAbPages(table);
        console.log(data);
        const pageList = [];
        for (let i = 1; i <= aBPages; i++) {
          pageList.push(i);
        }
      });
  }

  return (
    <div>
      <div>
        <SearchBar
          onChange={(event) => setMovie(event.target.value)}
          type="text "
          placeholder="Search movie.."
        />
        <SearchButton onClick={getMovies}>Search</SearchButton>
      </div>
      <div className="box">
        <div className="row" style={{ backgroundColor: "#3E363F" }}>
          <h4 className="col one">Title</h4>
          <h4 className="col two">Year</h4>
          <h4 className="col three">Type</h4>
        </div>

        {listMovie?.map(function (film) {
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
          // maths.abs returns the value of any given number
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
          onClick={(event) => setCurrentPage(Math.abs(currentPage + 1))}
          // math.abs is a function that returns the value of the number
          // you want the event to trigger when the user clicks
        >
          {" "}
          Next
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

export default MainPage;

const SearchBar = styled.input`
  font-size: 1.5rem;
`;
const SearchButton = styled.button`
  font-size: 1.5rem;
  background-color: #ba1b1d;
  cursor: pointer;
`;
