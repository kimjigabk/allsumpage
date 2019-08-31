import React from "react";

const Card = ({ title, description, url }) => {
  return (
    <div className="tc grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5">
      <img
        src="https://cdnimg.melon.co.kr/cm/album/images/026/81/021/2681021_1000.jpg/melon/quality/80/optimize"
        alt=""
        id="imgUrl"
        style={{ maxHeight: "200px", maxWidth: "200px" }}
        // style="maxHeight: 991px; max-width: 1000px; margin-left: -495.5px; margin-top: -495.5px;"
      />
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
        <p>{url}</p>
      </div>
    </div>
  );
};

export default Card;
