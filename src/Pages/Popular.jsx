import React, { useEffect, useState } from "react";
import { fetchMovies } from "../api";
import MovieList from "../Component/MovieList";

const Popular = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies("popular")
      .then((data) => {
        setMovies(data.results);
      })
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-muted">Popular Movies</h1>
     <MovieList movies={movies} />
    </div>
  );
};

export default Popular;
