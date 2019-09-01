import React from "react";

import { Link } from "react-router-dom";

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <Link to="/songs">반가워요</Link>
      </div>
    );
  }
}

export default MainPage;
