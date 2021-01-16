import React from "react";
function Search({ onSearchChange, search }) {

  const enterKey = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      search();
    }
  };
  return (
    <div className="card mt-3">
      <div className="card-body">
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Movie Title</label>
            <input
              type="text"
              onKeyDown={enterKey}
              onChange={onSearchChange}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Search;
