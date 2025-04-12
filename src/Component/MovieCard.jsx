import React from "react";
import { useNavigate } from "react-router-dom"; 

const MovieCard = ({ movie }) => {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate(`/movie/${movie.id}`); 
  };

  const imagePath = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="movie-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img src={`${imagePath}${movie.poster_path}`} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>Rating: {movie.vote_average}</p>
    </div>
  );
};

export default MovieCard;
