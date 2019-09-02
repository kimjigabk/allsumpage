import React from "react";

import { Link } from "react-router-dom";

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <Link to="/songs">반가워요</Link>
        <p></p>
        <a href="/auth/google">로그인 함 해보소</a>
        <p></p>
        <a href="/api/logout">로그아웃 함 해보소</a>
      </div>
    );
  }
}

export default MainPage;
