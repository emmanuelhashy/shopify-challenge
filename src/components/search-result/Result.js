import React from "react";
import Movie from "../movie/Movie";

function Result({ films, nominateMovie, loading, movieTitle }) {
  return (
    <div className="card h-100 mt-3" style={{backgroundColor: "black"}}>
      {!movieTitle ? 
      (<p style={{color: "#FFF"}}>Enter a movie title to search for movies...</p>) : ""
      }
      {loading ? (
        // <h5 style={{position: "absolute", left: "50%", top: "50%"}}>Loading.....</h5>
        <div style={{position: "absolute", left: "42%", top: "50%"}} class="loader"></div>
      ) : (
        <div>
          <p>Showing results for "{movieTitle}"</p>
        <div className=" d-flex flex-wrap justify-content-around scroll">
          {films.map((film) => {
            const { Title, Year, Type, Poster, imdbID, nominated } = film;
            return (
              <Movie key={imdbID} title={Title} year={Year} type={Type} poster={Poster} nominateMovie={nominateMovie} film={film} nominated={nominated}/>
              
            );
          })}
        </div>
        </div>
      )}
    </div>
  );
}

export default Result;
