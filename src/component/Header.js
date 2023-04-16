import React from "react";
import "../css/Header.css";
import { Link } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import { BiUserCircle } from "react-icons/bi";

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="header-con">
          <ul className="left-menu">
            <li>
              <a href="#">Discover</a>
            </li>
            <li>
              <Link to="/start-project">Start a project</Link>
            </li>
          </ul>
          <div className="logo">
            <Link to="">
              <h2>KICKSTARTER</h2>
            </Link>
          </div>
          <ul className="right-menu">
            <li>
              <a href="#">
                Search <HiSearch className="search-icon" />
              </a>
            </li>
            <li>
              <a href="#">
                <BiUserCircle className="user-icon" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
