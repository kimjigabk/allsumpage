import React from "react";

import { Link } from "react-router-dom";

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <p>안녕하세요</p>
        <p>
          <Link to="/songs">반가워요</Link>
        </p>
        <p>
          <Link to="/yourpage">너의 페이지에 가기</Link>
        </p>
        <p>
          <Link to="/about">알섬이란? </Link>
        </p>
      </div>
    );
  }
}

export default MainPage;
