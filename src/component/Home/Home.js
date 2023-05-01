// SD: View all Project
import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import StatisticBar from "./StatisticBar";
import ProjectCatalog from "./ProjectCatalog";
import "../../css/Home/Home.css";
import axios from "axios";

const Home = () => {
  const [recommendedProjects, setRecommendedProjects] = useState([]);
  const [projectsFunded, setProjectsFunded] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [numberOfPledges, setNumberOfPledges] = useState(0);
  const [featuredProject, setFeaturedProject] = useState({});

  useEffect(() => {
    const getProjects = async () => {
      const response = await axios.get(
        "http://127.0.0.1:8000/view_all_project"
      );
      setRecommendedProjects(response.data.projects_detail);
      setProjectsFunded(response.data.projects_funded);
      setTotalMoney(response.data.total_money);
      setNumberOfPledges(response.data.number_of_pledges);

      const featuredProject = response.data.projects_detail.reduce((prev, current) =>
        prev.percent > current.percent ? prev : current
      );
      setFeaturedProject(featuredProject);
      console.log(response.data);
    };
    getProjects();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="caption">
        <p>Bring a creative project to life.</p>
        <p>ON KICKSTARTER:</p>
      </div>
      <StatisticBar
        projectsFunded={projectsFunded}
        totalMoney={totalMoney}
        numberOfPledges={numberOfPledges}
      />
      <ProjectCatalog featuredProject={featuredProject} recommendedProjects={recommendedProjects} />
    </div>
  );
};

export default Home;
