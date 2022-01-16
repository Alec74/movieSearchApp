import React, { useState, useEffect } from "react";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://t4.ftcdn.net/jpg/03/27/91/27/360_F_327912775_7l0AxDLSclbmJ0PmQG8CVOjoGLuEos0l.jpg";


const Movie = ({ movie }) => {
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;


  const [data, setData] = useState("");
  const [ratingsIMDB, setRatingsIMDB] = useState("");
  const [ratingsRT, setRatingsRT] = useState("");
  const [ratingsMC, setRatingsMC] = useState("");


  useEffect(async () => {
    let url = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=afd4d466&plot=full`;
    fetch(url)
      .then(res => {
        if(!res.Response === "True") {
          throw Error('Could not fetch data')
        }
        return res.json();
      })
      .then(data => {
        setData(data)
        setRatingsIMDB(data.Ratings[0])
        setRatingsRT(data.Ratings[1])
        setRatingsMC(data.Ratings[2])
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  // console.log(ratingsIMDB)
  // console.log(ratingsRT)
  // console.log(ratingsMC)

  const [modalActive, setModalState] = useState(false);


  const handleToggle = () => {
    setModalState(!modalActive);
  };

  return (
    <div className="column is-half-mobile is-3-desktop is-4-tablet is-one-fifth-fullhd">
      <div className="movie" className="card">
        {/* <h2 >{movie.Title}</h2> */}
        <header className="card-header">
          <p className="card-header-title">
            {movie.Title}
          </p>
        </header>
        <div className="card-image click">
          <form className="js-modal-trigger" onClick={handleToggle} data-target="modal">
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
          <p className="card-footer-item">({movie.Year})&nbsp;<span>{data.Rated}</span></p>
        </footer>
        <div id="modal-js-example" className={`modal ${modalActive ? "is-active" : ""}`}>
          <div className="modal-background"></div>

          <div className="modal-content">
            <div className="box">
              <div className="content has-text-justified">
                <h3>{data.Title}</h3>
                {ratingsRT ? (
                  <p><b>{ratingsRT.Source}: </b>{ratingsRT.Value}</p>
                ) : (<p>Rotten Tomatoes Data not found</p>)
                }
                {ratingsIMDB ? (
                  <p><b>{ratingsIMDB.Source}: </b>{ratingsIMDB.Value}</p>
                ) : (<p>IMDB Data not found</p>)
                }
                {ratingsMC ? (
                  <p><b>{ratingsMC.Source}: </b>{ratingsMC.Value}</p>
                ) : (<p>MetaCritic Data not found</p>)
                }
                <p><b>Actors: </b>{data.Actors}</p>
                <p><b>Awards: </b>{data.Awards}</p>
                <p><b>Director: </b>{data.Director}</p>
                <p><b>Genre: </b>{data.Genre}</p>
                <p><b>Release Date: </b>{data.Released}</p>
                <p><b>Runtime: </b>{data.Runtime}</p>
                <p><b>Writers: </b>{data.Writer}</p>
                <h3>Plot:</h3>
                <p>{data.Plot}</p>
              </div>
            </div>
          </div>
          <button onClick={handleToggle} className={`modal-close is-large ${modalActive ? "" : "is-active"}`} aria-label="close"></button>
        </div>
      </div>

    </div>
  );
};


export default Movie;