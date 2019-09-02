import React from "react";
import "./SearchBox.css";

const SearchBox = () => {
  return (
    <div className="row" style={{ margin: "1rem" }}>
      <div className="ui mini icon input">
        <input type="text" placeholder="Search"></input>
        <i className="search icon"></i>
      </div>
    </div>
  );
};

export default SearchBox;
