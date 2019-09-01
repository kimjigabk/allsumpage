import React from "react";

const VideoDetail = ({ title, artist, description, closeVideo }) => {
  return (
    <div className="ui fluid card">
      <div className="content">
        <i
          className="close icon link"
          style={{ position: "absolute", right: "0.95rem" }}
          onClick={() => {
            closeVideo();
          }}
        ></i>
        <div className="header">{title}</div>
        <div className="meta">{artist}</div>
        <div className="description">
          <p>{description.slice(0, 150)}</p>
        </div>
      </div>
      <div className="extra content">
        <span className="left floated like">
          <i className="like icon"></i>
          Like
        </span>
        <span className="right floated star">
          <i className="star icon"></i>
          Favorite
        </span>
      </div>
    </div>
  );
};

export default VideoDetail;
