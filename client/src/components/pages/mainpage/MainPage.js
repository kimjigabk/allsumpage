import React from "react";

const MainPage = ({ history }) => {
  return (
    <div className="ui text container">
      <div className="ui link very relaxed items">
        <div className="item" onClick={() => history.push("/songs")}>
          <div className="ui small image">
            <img alt="music" src="images/150150150.jpg"></img>
          </div>
          <div className="middle aligned content">
            <div className="header">알섬의 노래</div>
          </div>
        </div>
        <p
          style={{
            margin: "auto 5%",
            borderTop: "1px solid rgba(34,36,38,.15)"
          }}
        ></p>
        <div className="item" onClick={() => history.push("/about")}>
          <div className="ui small image">
            <img alt="about" src="images/150150.jpg"></img>
          </div>
          <div className="middle aligned content">
            <div className="header">알섬이란?</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
