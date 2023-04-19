import React, { useEffect, useState } from "react";
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
      <div className="main-project-container">
        <p>FEATURED PROJECT</p>
        <div className="main-con">
          <img src={featuredProject.image} alt="main project" />
          <div className="main-project-detail">
            <p>{featuredProject.name}</p>
            <p>{featuredProject.detail}</p>
            <p>By {featuredProject.creator}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProject;
