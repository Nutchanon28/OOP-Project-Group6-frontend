import React from "react";
import "../../css/Home/NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="navcon">
          <ul className="category">
            <li>
              <a>Arts</a>
            </li>
            <li>
              <a>Comics & Illustration</a>
            </li>
            <li>
              <a>Design & Tech</a>
            </li>
            <li>
              <a>Food & Craft</a>
            </li>
            <li>
              <a>Games</a>
            </li>
            <li>
              <a>Music</a>
            </li>
            <li>
              <a>Publishing</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
