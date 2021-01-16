import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBox from "../components/search-field/Search";
import Nomination from "../components/nomination/Nomination";
import Result from "../components/search-result/Result";
function App() {
  const [values, setValues] = useState({
    movieTitle: "",
    films: [],
    loading: false,
  });

  const [nominations, setNominations] = useState([]);

  const nominateMovie = (movie) => {
    console.log("nominated movie", movie);
    setNominations([...nominations, movie]);
    persistToLocalStorage(movie);
    console.log("nominations", nominations);
  };

  const persistToLocalStorage = (movie) => {
    localStorage.setItem('nominations', JSON.stringify([...nominations, movie]));
  }

  const loadLocalStorageNominations = () => {
    let movieNominations = localStorage.getItem('nominations')?JSON.parse(localStorage.getItem('nominations')):[]
    console.log("...", movieNominations)
    if(movieNominations) {
      setNominations(movieNominations)
    }
  }

  const search = () => {
    const { movieTitle } = values;
    let nominations = localStorage.getItem('nominations')?JSON.parse(localStorage.getItem('nominations')):[]
    setValues({ ...values, loading: true });
    fetch(
      `https://www.omdbapi.com/?i=tt3896198&apikey=e79d35c7&s=${
        movieTitle ? movieTitle : "superman"
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        setValues({ ...values, loading: false });
        console.log("newmadData",data);
        if (data) {
          const newData = data.Search.map(element => {
            if(nominations.find(e=> e.imdbID === element.imdbID)){
              element.nominated = true;
            }else {
              element.nominated =false;
            }
            return element
          })
          // const muteData = [...newData, nominated: true]
          console.log("newData",newData);
          setMovies(newData);
          console.log(values);
        }
      })
      .catch((error) => {
        setValues({ ...values, loading: false });
        console.log(error);
      });
  };

  const setMovies = (searchedMovie) => {
    console.log("movies", searchedMovie);
    setValues({ ...values, films: searchedMovie });
  };

  const onSearchChange = (event) => {
    const searchItem = event.target.value;
    setValues({ ...values, movieTitle: searchItem });
    console.log("onSearchChange", searchItem);
  };

  const removeNominatedMovie = (movie) => {
    console.log("remove", movie);
    let newValues = [...nominations];
    const index = nominations.findIndex(
      (nomination) => nomination.imdbID === movie.imdbID
    );
    if (index >= 0) {
      //item exist in the basket, remove it
      newValues.splice(index, 1);
    } else {
      console.warn(
        `Can't remove product{id: ${movie.imdbID}} as it is not in the basket`
      );
    }
    setNominations([...newValues]);
    removeNominatedMovieFromLocalStorage(newValues)
    enableNominateBtn(movie)
  };

  const enableNominateBtn = (movie) => {
    values.films.map(film => {
      if(film.imdbID === movie.imdbID){
        film.nominated = false
      }
    })
  }
  const removeNominatedMovieFromLocalStorage = (newValues) => {
    localStorage.setItem('nominations', JSON.stringify([...newValues]));
  }

  // const addNomination = () => {};

  const removeAllNominations = () => {
    setNominations([]);
    values.films.map(film => film.nominated = false)
  };

  useEffect(() => {
    const abortController = new AbortController()

    loadLocalStorageNominations()
    return function cleanup(){
      abortController.abort()
    }
  }, [])

  const { films, loading, movieTitle } = values;
  return (
    <div className="p-4">
      <SearchBox onSearchChange={onSearchChange} search={search} />
      <div className="row">
        <div className="col-sm">
          <Result
            films={films}
            nominateMovie={nominateMovie}
            loading={loading}
            movieTitle={movieTitle}
          />
        </div>
        <div className="col-sm">
          <Nomination
            nominations={nominations}
            removeMovie={removeNominatedMovie}
            removeAllNominations={removeAllNominations}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
