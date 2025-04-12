import React, { useEffect, useState } from "react";
import { fetchMovies } from "../api";
import MovieList from "../Component/MovieList";
import Pagination from "../Component/Pagination";

const UpcomingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchMovies("upcoming", currentPage)
      .then((data) => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setError(null);
      })
      .catch(() => setError("Failed to load upcoming movies"))
      .finally(() => setIsLoading(false));
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Upcoming Movies</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!isLoading && !error && <MovieList movies={movies} />}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UpcomingMovies;
