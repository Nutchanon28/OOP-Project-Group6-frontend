import React from "react";
import "../../css/Home/StatisticBar.css";

const StatisticBar = () => {
  return (
    <div className="stat-bar">
      <div className="container">
        <div className="stat-con">
          <div className="stat-box">
            <p>236,206</p>
            <p>projects funded</p>
          </div>
          <div className="stat-box">
            <p>$7,188,219,854</p>
            <p>towards creative work</p>
          </div>
          <div className="stat-box">
            <p>86,584,507</p>
            <p>pledges</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticBar;
