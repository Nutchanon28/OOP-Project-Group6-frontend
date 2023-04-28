import React from "react";
import "../../css/Home/StatisticBar.css";

const StatisticBar = ({ projectsFunded, totalMoney, numberOfPledges}) => {
  return (
    <div className="stat-bar">
      <div className="container">
        <div className="stat-con">
          <div className="stat-box">
            <p>{projectsFunded}</p>
            <p>projects funded</p>
          </div>
          <div className="stat-box">
            <p>{totalMoney} Baht</p>
            <p>towards creative work</p>
          </div>
          <div className="stat-box">
            <p>{numberOfPledges}</p>
            <p>pledges</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticBar;
