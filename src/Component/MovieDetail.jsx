import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails, fetchMovieCredits } from "../api";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchMovieDetails(id), fetchMovieCredits(id)])
      .then(([movieData, creditsData]) => {
        setMovie(movieData);
        setCast(creditsData.cast.slice(0, 10)); // Top 10 cast members
      })
      .catch(() => console.error("Failed to fetch movie data or credits"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container mt-5 text-center text-light">Loading...</div>;
  if (!movie) return <div className="container mt-5 text-center text-danger">Movie details not found!</div>;

  return (
    <div className="container mt-5 p-4 rounded-4 bg-dark text-light shadow-lg">
      <h1 className="text-center mb-4 text-warning">{movie.title}</h1>
      <div className="row g-4 align-items-start">
        <div className="col-md-4">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
            className="img-fluid rounded-4 shadow"
          />
        </div>
        <div className="col-md-8">
          <div className="bg-secondary p-3 rounded-4 shadow-sm">
            <h3 className="text-info">Overview</h3>
            <p>{movie.overview}</p>
            <p><strong className="text-warning">Release Date:</strong> {movie.release_date}</p>
            <p><strong className="text-warning">Rating:</strong> {movie.vote_average}</p>
            <p><strong className="text-warning">Runtime:</strong> {movie.runtime} minutes</p>
            <p>
              <strong className="text-warning">Genres:</strong>{" "}
              {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-center mt-5 mb-3 text-info">Top Cast</h3>
      <div className="row justify-content-center">
        {cast.map((actor) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={actor.id}>
            <div className="card bg-black text-light rounded-4 h-100 shadow-sm">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={actor.name}
                className="card-img-top rounded-top-4"
              />
              <div className="card-body text-center">
                <h6 className="card-title">{actor.name}</h6>
                <p className="text-muted small">as {actor.character}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;
