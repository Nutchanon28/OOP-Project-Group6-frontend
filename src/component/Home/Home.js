import React from "react";
import NavBar from "./NavBar";
import StatisticBar from "./StatisticBar";
import ProjectCatalog from "./ProjectCatalog";
import "../../css/Home/Home.css";

const Home = () => {
  return (
    <div>
      <NavBar />
      <div className="caption">
        <p>Bring a creative project to life.</p>
        <p>ON KICKSTARTER:</p>
      </div>
      <StatisticBar />
      <ProjectCatalog />
    </div>
  );
};

export default Home;
