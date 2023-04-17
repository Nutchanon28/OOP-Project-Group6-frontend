import React, { useEffect, useState } from "react";
import ProjectBox from "./ProjectBox";
import "../../css/Home/RecommendedProject.css";
import axios from "axios";

const RecommendedProject = () => {
  const [recommendedProjects, setRecommendedProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getProjects = async () => {
      const response = await axios.get(
        "http://127.0.0.1:8000/view_all_project"
      );
      setRecommendedProjects(response.data);
      console.log(response.data);
      console.log(response.data.slice(3 * (currentPage - 1), 3 * currentPage));
    };
    getProjects();
  }, []);

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
