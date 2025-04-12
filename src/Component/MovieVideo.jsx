import React, { useEffect, useState } from "react";

const MovieVideos = ({ movieId }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieVideos = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`;
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch videos");
        const data = await response.json();
        setVideos(data.results || []);
      } catch (err) {
        setError("Unable to load videos for this movie.");
      } finally {
        setLoading(false);
      }
    };
    if (movieId) fetchMovieVideos();
  }, [movieId]);

  if (loading) return <div>Loading videos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h3>Movie Videos</h3>
      {videos.length === 0 ? <p>No videos available</p> : null}
      {videos.map((video) => (
        <div key={video.id}>
          <h5>{video.name}</h5>
          {video.site === "YouTube" && (
            <iframe
              src={`https://www.youtube.com/embed/${video.key}`}
              frameBorder="0"
              allowFullScreen
              title={video.name}
              style={{ width: "100%", height: "315px" }}
            ></iframe>
          )}
        </div>
      ))}
    </div>
  );
};

export default MovieVideos;
