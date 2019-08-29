import React from "react";
import { Link } from "react-router-dom";

const SongList = () => {
  return (
    <div>
      <div>
        <Link to="/songs/1" className= "header">Song one</Link>
        <Link to="/songs/2" className= "header">Song Two</Link>
      </div>
    </div>
  );
};

export default SongList;
