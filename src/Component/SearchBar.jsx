import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "./MovieCard";

export default function SearchBar() {
   const [searchParams] = useSearchParams();
   const query = searchParams.get("query");
   const [movies, setMovies] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      setLoading(true);
      setError(null);

      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${query}&page=1`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch movies");
          }
          return response.json();
        })
        .then((data) => {
          setMovies(data.results || []);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
          setError("An error occurred while fetching movies.");
          setLoading(false);
        });
    }
  }, [query]);

  const baseImageUrl = "https://image.tmdb.org/t/p/w500"; // Base URL for movie poster images

  return (
    <div className="container">
      <h2>Search Results for "{query}"</h2>

      {loading && <p>Loading movies...</p>}

      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <div className="movie-list">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p>No results found. Try another keyword.</p>
          )}
        </div>
      )}
    </div>
  );
}
