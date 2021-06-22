import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "../images/picture-sorry.png";

function MainPage() {
  const [searchMovie, setMovie] = useState("shrek");

  const [listMovie, setListMovie] = useState([]);
  // the movies the set allows you to store it
  const [aBPages, setAbPages] = useState(0);
  // pages
  const [currentPage, setCurrentPage] = useState(1);
  //pages going through start at 1 because of a page

  // what will already load for the user
  useEffect(() => {
    fetch(
      `https://www.omdbapi.com/?s=${searchMovie}&page=${currentPage}&apikey=24885019`
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
  // i want it to display the current page already

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
      `https://www.omdbapi.com/?s=${searchMovie}&page=${currentPage}&apikey=24885019`
    )
      .then((response) => response.json())

      .then((data) => {
        setListMovie(data.Search);
        const temp = Math.ceil(data.totalResults / 10);
        setAbPages(temp);
        console.log(data);
        const pagesList = [];
        for (let i = 1; i <= aBPages; i++) {
          pagesList.push(i);
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
        {!listMovie && <Sorry>No movie found try again?</Sorry>}

        {listMovie?.map(function (film) {
          return (
            <div
              className="row"
              style={{ backgroundColor: "#FF8700", cursor: "pointer" }}
            >
              {film.Poster !== "N/A" && (
                <img
                  className="col left poster"
                  src={film.Poster}
                  alt={film.Title}
                ></img>
              )}
              {film.Poster === "N/A" && (
                <img
                  className="col left poster"
                  src={Image}
                  alt={film.Title}
                ></img>
              )}

              <div class name="col right poster">
                <p>{film.Title}</p>
                <p>{film.Year}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="buttons">
        <button
          style={{
            backgroundColor: currentPage ? "#55868C" : "#04395E",
            cursor: "pointer",
          }}
          onClick={(event) => setCurrentPage(1)}
        >
          First
        </button>
        <button
          style={{
            backgroundColor: currentPage ? "#55868C" : "#04395E",
            cursor: "pointer",
          }}
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
const Sorry = styled.div`
  font-size: 3rem;
  color: #ffd60a;
`;
