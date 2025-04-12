import React, { useEffect, useState } from "react";
import { fetchMovies } from "../api";
import MovieList from "../Component/MovieList";
import Pagination from "../Component/Pagination";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMovies("popular", currentPage);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError("Failed to fetch movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [currentPage]);

  return (
    <div>
      <h1 className="text-muted">All Movies</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : movies.length > 0 ? (
        <>
          <MovieList movies={movies} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};

export default Home;
