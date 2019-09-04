import React from "react";
import { Link } from "react-router-dom";

import GoogleAuth from "./GoogleAuth";

const Header = () => {
  return (
    <div
      className="ui tabular menu"
      style={{ height: "39px", marginBottom: "1px" }}
    >
      <Link to="/" className="item">
        Allsum
      </Link>
      <div className="right menu">
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
