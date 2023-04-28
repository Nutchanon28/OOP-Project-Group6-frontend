import React from "react";
import MainProject from "./MainProject";
import "../../css/Home/ProjectCatalog.css";
import RecommendedProject from "./RecommendedProject";

const ProjectCatalog = ({ featuredProject, recommendedProjects }) => {
  return (
    <div className="project-catalog">
      <div className="catalog-container">
        <div className="catalog-con">
          <MainProject featuredProject={featuredProject} />
          <RecommendedProject recommendedProjects={recommendedProjects} />
        </div>
      </div>
    </div>
  );
};

export default ProjectCatalog;
