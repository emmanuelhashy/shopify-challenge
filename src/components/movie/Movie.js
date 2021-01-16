import React from "react";
function Movie({
  title,
  year,
  type,
  poster,
  nominateMovie,
  film,
  remove,
  removeMovie,
  nominated,
}) {
  return (
    // <div className="card mt-3 mb-3 p-2">
    //   <div className="d-flex align-items-start">
    //     <img src={poster} width="150" height="100" alt="movie poster" />
    //     <div className="ml-2">
    //       <p>Title: {title}</p>
    //       <p>Year: {year}</p>
    //       <p>Type: {type}</p>
    //       {remove ? (
    //         <button
    //           className="btn btn-danger"
    //           onClick={() => {
    //             console.log(film);
    //             film.nominated = false
    //             removeMovie(film);
    //           }}
    //         >
    //           Remove
    //         </button>
    //       ) : (
    //         <button
    //         disabled={nominated}
    //           className="btn btn-primary"
    //           onClick={() => {
    //             console.log("btn",film);
    //             film.nominated = true
    //               nominateMovie(film)
    //             }}
    //         >
    //           Nominate
    //         </button>
    //       )}
    //     </div>
    //   </div>
    // </div>

    <div className="day day2 mt-4">
      <img
        className="imag"
        src={poster}
        width="100%"
        height="160"
        alt="movie poster"
      />
      <svg
        className="lines"
        xmlns="http://www.w3.org/2000/svg"
        width="300"
        height="80"
        viewBox="0 0 300 115"
      >
        <path d="M0 30s79.3 68.6 112.3 51.5S163.8 9.1 195 32.4s77 33.3 105 18.7" />
      </svg>
      <div className="text">
        <span className="header tI">{type}</span>
        <span className="temp tI">{year}</span>
        <p className="cloud">{title}</p>
      </div>
      {remove ? (
        <button
          className="butn second mt-4"
          onClick={() => {
            console.log(film);
            film.nominated = false;
            removeMovie(film);
          }}
        >
          Remove
        </button>
      ) : (
        <button
          disabled={nominated}
          className="butn second mt-4"
          onClick={() => {
            console.log("butn", film);
            film.nominated = true;
            nominateMovie(film);
          }}
        >
          Nominate
        </button>
      )}
    </div>
  );
}

export default Movie;
