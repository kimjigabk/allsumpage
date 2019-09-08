import React from "react";

const AboutItem = ({ imageSrc, header, meta, description, link }) => {
  return (
    <div className="item" style={{ textAlign: "left" }}>
      <div className="ui tiny image">
        <img alt="music" src={imageSrc} style={{ marginBottom: "7px", borderRadius: "19px" }}></img>
      </div>
      <div className="content" style={{ fontSize: "92%", padding: "0 1.8rem" }}>
        <div className="header">{header}</div>
        <div className="meta" style={{ margin: 0, fontSize: "0.8em" }}>
          <span>{meta}</span>
        </div>
        <div className="description">
          <p>{description}</p>
        </div>
        <div className="extra">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={link}
            style={{ fontSize: "88%", color: "rgba(25,25,155,.4)" }}
          >
            Additional Details
          </a>
          {/* Additional Details */}
        </div>
      </div>
    </div>
  );
};

export default AboutItem;
