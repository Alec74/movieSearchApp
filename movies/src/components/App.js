import React, { useReducer, useEffect } from "react";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";
import '../App.css';


const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=afd4d466"


const initialState = {
  loading: true,
  movies: [],
  errorMessage: null,
  num: 0
};


const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
        num: +1
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};



const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {

    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {

        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.Search
        });
      });
  }, []);

  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=afd4d466`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.Error
          });
        }
      });
  };


  const { movies, errorMessage, loading, num } = state;

  return (
    <div className="App">
      <Header text="Movie Search" />
      <br></br>
      <Search search={search} />
      <br></br>
      {num > 0 ? (
        <p className="App-intro">Displaying Search Results:</p>
      ) : (<p className="App-intro">Welcome to the Movie Search App! Click a poster to view more details.</p>)
      }
      <br></br>
      <div className="movies">
        <div className="columns is-mobile is-multiline is-centered">
          {loading && !errorMessage ? (
            <span>loading... </span>
          ) : errorMessage ? (
            <div className="errorMessage">{errorMessage}</div>
          ) : (
            movies.map((movie, index) => (
              <Movie key={`${index}-${movie.Title}`} movie={movie} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;