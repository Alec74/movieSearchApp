import React from "react";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://t4.ftcdn.net/jpg/03/27/91/27/360_F_327912775_7l0AxDLSclbmJ0PmQG8CVOjoGLuEos0l.jpg";


const Movie = ({ movie, review }) => {
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
  return (
    <div className="movie">
      <h2>{movie.Title}</h2>
      <div>
        <img
          width="200"
          alt={`The movie titled: ${movie.Title}`}
          src={poster}
        />
      </div>
      <p>({movie.Year})</p>
    </div>
  );
};


export default Movie;