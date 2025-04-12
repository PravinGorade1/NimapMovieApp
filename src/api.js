const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (type = "popular", page = 1) => {
  const response = await fetch(`${BASE_URL}/movie/${type}?api_key=${API_KEY}&language=en-US&page=${page}`);
  return response.json();
};

export const fetchMovieDetails = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
  return response.json();
};

export const fetchMovieCredits = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`);
  return response.json();
};




