import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/Home/MainProject.css";

const MainProject = ({ featuredProject }) => {
  const [mainProject, setMainProject] = useState({});
  const [mainProjectImage, setMainProjectImage] = useState("");
  const loadMainProject = async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    const responseJson = await response.json();
    setMainProject(responseJson);
    const responseImage = await fetch(
      `https://jsonplaceholder.typicode.com/photos/1`
    );
    const responseImageJson = await responseImage.json();
    setMainProjectImage(responseImageJson);
  };

  useEffect(() => {
    loadMainProject();
  }, []);

  return (
    <div className="main-project">
      <Link to={`project/${featuredProject.id}`}>
      <div className="main-project-container">
        <p>FEATURED PROJECT</p>
        <div className="main-con">
          <img src={featuredProject.image} alt="main project" />
          <div className="main-project-detail">
            <p>{featuredProject.name}</p>
            {featuredProject?.detail?.length > 300 ? <p>{featuredProject?.detail.substring(0, 300)}...</p> : <p>{featuredProject?.detail}</p>}
            <p>By {featuredProject.creator}</p>
          </div>
        </div>
      </div>
    </Link>
    </div>
  );
};

export default MainProject;
