import React, { useEffect, useState } from "react";
import "../../css/Home/MainProject.css";

const MainProject = () => {
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
          <img src={mainProjectImage.url} alt="main project" />
          <div className="main-project-detail">
            <p>{mainProject.title}</p>
            <p>{mainProject.body}</p>
            <p>By {mainProject.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProject;
