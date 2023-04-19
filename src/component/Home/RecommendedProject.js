import React, { useState } from "react";
import ProjectBox from "./ProjectBox";
import "../../css/Home/RecommendedProject.css";

const RecommendedProject = ({ recommendedProjects }) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="recommended-project">
      <div className="recommended-project-container">
        <p className="recommended-header">RECOMMENDED FOR YOU</p>
        <div className="recommended-con">
          {recommendedProjects
            .slice(3 * (currentPage - 1), 3 * currentPage)
            .map((project) => {
              return <ProjectBox project={project} key={project.id} />;
            })}
        </div>
        <div className="page-bar">
          <a
            onClick={() => {
              setCurrentPage(1);
            }}
          >
            1
          </a>
          <a
            onClick={() => {
              setCurrentPage(2);
            }}
          >
            2
          </a>
          <a
            onClick={() => {
              setCurrentPage(3);
            }}
          >
            3
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecommendedProject;
