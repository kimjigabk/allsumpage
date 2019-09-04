import React from "react";


const SearchBox = ({ songs, onInputChange }) => {
  return (
    <div className="row" style={{ margin: "1rem" }}>
      <div className="ui mini icon input">
        <input
          onChange={e => onInputChange(e.target.value)}
          type="text"
          placeholder="Search"
        ></input>
        <i className="search icon"></i>
      </div>
    </div>
  );
};

export default SearchBox;
