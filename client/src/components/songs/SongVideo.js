import React from "react";

const SongVideo = ({ url }) => {
  const videoId = url.slice(32);
  const videoSrc = `https://www.youtube.com/embed/${videoId}`;
  return (
    <div className="ui embed">
      <iframe
        title="video player"
        src={videoSrc}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default SongVideo;
