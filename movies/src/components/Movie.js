import React, { useState, useEffect } from "react";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://t4.ftcdn.net/jpg/03/27/91/27/360_F_327912775_7l0AxDLSclbmJ0PmQG8CVOjoGLuEos0l.jpg";


const Movie = ({ movie }) => {
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;


  const [data, setData] = useState("");


  useEffect(async () => {
    let url = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=afd4d466&plot=full`;
    const response = await fetch(url);
    const data = await response.json();
    setData(data)
  },[])



  const [modalActive, setModalState] = useState(false);


  const handleToggle = () => {
    setModalState(!modalActive);
  };

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
          <form className="js-modal-trigger" onClick={handleToggle} data-target="modal-js-example">
            <figure className="image is-2by3">
              <img
                width="200"
                alt={`The movie titled: ${movie.Title}`}
                src={poster}
              />
            </figure>
          </form>
        </div>
        <footer className="card-footer">
          <p className="card-footer-item">({movie.Year})</p>
        </footer>
        {/* <button className="js-modal-trigger" onClick={handleToggle} data-target="modal-js-example">
          Open JS example modal
        </button> */}
        <div id="modal-js-example" className={`modal ${modalActive ? "is-active" : ""}`}>
          <div className="modal-background"></div>

          <div className="modal-content">
            <div className="box">
              <p></p>
            </div>
          </div>
          <button onClick={handleToggle} className={`modal-close is-large ${modalActive ? "" : "is-active"}`} aria-label="close"></button>
        </div>
      </div>

    </div>
  );
};


export default Movie;