import { React, useEffect, useState } from "react";
import searchIcon from "./search.svg";
import MovieCard from "./components/MovieCard";
import "./App.css";

const API_URL = "https://www.omdbapi.com?apikey=95a929dd";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
    console.log(data.Search);
  };

  useEffect(() => {
    searchMovies("Antman");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search For Movies..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <img
          src={searchIcon}
          alt="Search Icon"
          onClick={() => {
            searchMovies(search);
            setSearch("");
          }}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h1>No Movies Found...</h1>
        </div>
      )}
    </div>
  );
};

export default App;
