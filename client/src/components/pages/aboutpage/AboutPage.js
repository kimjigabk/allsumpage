import React from "react";
import { Link } from "react-router-dom";
import AboutItem from "./AboutItem";

const AboutPage = () => {
  const data = require("./AboutItems.json");
  return (
    <div>
      <p style={{ marginTop: "1rem" }}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://namu.wiki/w/%EC%95%8C%EC%84%AC"
        >
          나무위키 (Wiki)
        </a>
      </p>
      <p>
        <Link to="/songs">
          <i className="play icon" />
        </Link>
      </p>
      <div className="ui text container">
        <div className="ui relaxed items">
          {data.map((el, idx) => (
            <React.Fragment key={idx}>
              {!!idx && (
                <p
                  style={{
                    margin: "auto 45%",
                    borderTop: "3px dotted rgba(34,36,38,.15)"
                  }}
                ></p>
              )}
              <AboutItem {...el} />
            </React.Fragment>
          ))}
        </div>
      </div>
      <div style={{ padding: "15px 0 35px" }}>
        <div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/kimjigab/"
          >
            <button className="ui circular instagram icon button">
              <i className="instagram icon"></i>
            </button>
          </a>
          　
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://youtube.com/dkftja"
          >
            <button className="ui circular youtube icon button">
              <i className="youtube icon"></i>
            </button>
          </a>
        </div>
        <div
          className="ui right floated basic button"
          style={{ padding: "11px", marginBottom: "1px" }}
          onClick={() => {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
          }}
        >
          🛆 Top
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
