import React, { useEffect, useState } from "react";
import ProjectDetail from "./ProjectDetail";
import Title from "./Title";
import ProjectNav from "./ProjectNav";
import ProjectCampaign from "./ProjectCampaign";
import { useParams } from "react-router-dom";
import axios from "axios";
// import './HomepageFeaturedProject.css';

const HomepageFeaturedProject = () => {
  const [project, setProject] = useState({});
  const { projectId } = useParams();

  useEffect(() => {
    const getProject = async () => {
      const response = await axios.get(
        `http://127.0.0.1:8000/view_project/${projectId}`
      );
      setProject(response.data);
      console.log(response.data.project_detail.number_of_backers);
    };
    getProject();
  }, [projectId]);

  return (
    <div className="homepage-project">
      <Title
        projectName={project.project_detail?.name}
        projectCategory={project.project_detail?.category}
      />
      <ProjectDetail
        pledgeReceived={project.project_detail?.pledge_received}
        numberOfBackers={project.project_detail?.number_of_backers}
        pledgeGoal={project.project_detail?.pledge_goal}
        pledgeDuration={project.project_detail?.project_duration}
      />
      <ProjectNav />
      <ProjectCampaign projectDetail={project.project_detail?.detail} creator={project.creator_detail} rewards={project.pledge_rewards}/>
    </div>
  );
};

export default HomepageFeaturedProject;
