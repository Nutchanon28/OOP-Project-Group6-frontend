import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/OtherPage/FreshFavorites.css";

function FreshFavorites() {
  const [recommendedProjects, setRecommendedProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      const response = await axios.get(
        "http://127.0.0.1:8000/view_all_project"
      );
      console.log(response.data);
      setRecommendedProjects(response.data);
    };
    getProjects();
  }, []);

  return (
    <div className="freshFavorites">
      <div className="freshFavorites-container">
        <div>
          <p className="title">FRESH FAVORITES</p>
        </div>
        <div className="freshFavorites-con">
          {recommendedProjects.map((project) => {
            return (
              <div className="project" key={project.id}>
                <div className="project-picture"></div>
                <div className="percentage">
                  <p className="grayBox"> </p>
                  <p className="greenBox"> </p>
                </div>
                <div className="project-info">
                  <p className="project-name">{project.name}</p>
                  <p className="description">{project.detail}</p>
                  <p className="editor">By {project.creator}</p>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}

export default FreshFavorites;
