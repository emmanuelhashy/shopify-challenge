import React from "react";
import Movie from "../movie/Movie";
function Nomination({ nominations, removeMovie, removeAllNominations }) {
  console.log("nom....", nominations);
  let remove = true;
  return (
    <div className="card mt-3" >
      <div className="btn-container">
        {nominations.length > 0 ? (
          <button
            onClick={() => removeAllNominations()}
            className="btn btn-secondary mr-2"
            style={{position: "fixed", zIndex: "100"}}
          >
            Remove Nominations
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="card-body scroll">
        <div className=" d-flex flex-wrap justify-content-around">
        {nominations.map((nomination) => {
          const { Title, Year, Type, Poster, imdbID } = nomination;
          return (
            <Movie
              key={imdbID}
              title={Title}
              year={Year}
              type={Type}
              poster={Poster}
              remove={remove}
              removeMovie={removeMovie}
              film={nomination}
            />
          );
        })}
        </div>
      </div>
    </div>
  );
}

export default Nomination;
