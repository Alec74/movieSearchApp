import React from "react";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://t4.ftcdn.net/jpg/03/27/91/27/360_F_327912775_7l0AxDLSclbmJ0PmQG8CVOjoGLuEos0l.jpg";


const Movie = ({ movie }) => {
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
  return (
    <div className="column is-half-mobile is-3-desktop is-4-tablet ">
      <div className="movie" className="card">
        {/* <h2 >{movie.Title}</h2> */}
        <header className="card-header">
          <p className="card-header-title">
            {movie.Title}
          </p>

        </header>
        <div className="card-image">
          <figure className="image is-2by3">
            <img
              width="200"
              alt={`The movie titled: ${movie.Title}`}
              src={poster}
            />
          </figure>
        </div>
        <footer className="card-footer">
          <p className="card-footer-item">({movie.Year})</p>
        </footer>
      </div>
    </div>
  );
};


export default Movie;