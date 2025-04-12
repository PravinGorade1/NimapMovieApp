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

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (!movie) return <div className="container mt-5">Movie details not found!</div>;

  return (
    <div className="container mt-5 bg-secondary rounded">
      <h1>{movie.title}</h1>
      <div className="row">
        <div className="col-md-4">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
            className="img-fluid rounded-3"
          />
        </div>
        <div className="col-md-6">
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average}</p>
          <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
          <p><strong>Genres:</strong> {movie.genres.map((genre) => genre.name).join(", ")}</p>
          </div>

          <h3 className="text-center text-light my-3 ">Top Cast</h3>
          <div className="row">
            {cast.map((actor) => (
              <div className="col-md-3 col-sm-4 mb-3" key={actor.id}>
                <div className="card w-75 rounded-5 bg-black">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` // Actor photo
                        : "https://via.placeholder.com/200x300?text=No+Image" // Fallback image
                    }
                    alt={actor.name}
                    className="card-img-top"
                  />
                  <div className="card-body text-center">
                    <h6>{actor.name}</h6>
                    <p className="text-muted small">as {actor.character}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
       
      </div>
    </div>
  );
};

export default MovieDetail;
