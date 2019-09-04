import React from "react";
import SongList from "../songs/SongList";

const YourPage = () => {
  return (
    <div>
      <p>당신이 favorite한 음악만 보여준다</p>
      <SongList />
    </div>
  );
};

export default YourPage;
