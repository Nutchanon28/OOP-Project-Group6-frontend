import React, { useState, useEffect } from "react";
import "../../css/Home/ProjectBox.css";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { VscBookmark } from "react-icons/vsc";
import { Link } from "react-router-dom";

const ProjectBox = ({ project }) => {
  const [projectImage, setProjectImage] = useState(null);

  const getImage = async (theID) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos/${theID}`
    );
    const responseJson = await response.json();
    setProjectImage(responseJson);
  };

  useEffect(() => {
    getImage(project.id);
  }, []);

  let imageElement = null;
  if (projectImage) {
    imageElement = (
      <div className="recommended-project-image">
        <img src={project.image} alt="project" />
      </div>
    );
  }

  return (
    <Link to={`/project/${project.id}`}>
      <div className="project-box">
        {imageElement}
        <div className="project-box-detail">
          <p className="project-box-title">{project.name}</p>
          <p>{project.percent} %</p>
          <p>By {project.creator}</p>
          <div className="operation-bar">
            <div>
              <VscBookmark />
            </div>
            <div>
              <AiOutlineLike />
            </div>
            <div>
              <AiOutlineDislike />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectBox;
