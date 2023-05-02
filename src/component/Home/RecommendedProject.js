import React, { useState } from "react";
import ProjectBox from "./ProjectBox";
import "../../css/Home/RecommendedProject.css";

const RecommendedProject = ({ recommendedProjects }) => {
  const [currentPage, setCurrentPage] = useState(2);

  return (
    <div className="recommended-project">
      <div className="recommended-project-container">
        <p className="recommended-header">RECOMMENDED FOR YOU</p>
        <div className="recommended-con">
          {recommendedProjects
            ?.slice(3 * (currentPage - 1), 3 * currentPage)
            .map((project) => {
              return <ProjectBox project={project} key={project.id} />;
            })}
        </div>
        <div className="page-bar">
        <a
            onClick={() => {
              setCurrentPage(currentPage - 5);
            }}
          >
            {currentPage - 5 <= 0 ?  "" : "<<"}
          </a>
          <a
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
          >
            {currentPage - 1 === 0 ? "" : currentPage - 1}
          </a>
          <a
            onClick={() => {
              setCurrentPage(currentPage);
            }}
          >
            {currentPage}
          </a>
          <a
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
          >
            {currentPage + 1 > parseInt(recommendedProjects.length/3) + 1 ?  "" : currentPage + 1}
          </a>
          <a
            onClick={() => {
              setCurrentPage(currentPage + 5);
            }}
          >
            {currentPage + 5 > parseInt(recommendedProjects.length/3) + 1 ?  "" : ">>"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecommendedProject;
