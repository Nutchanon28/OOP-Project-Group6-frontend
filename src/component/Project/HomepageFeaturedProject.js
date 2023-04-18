// SD: View Project
import React, { useContext, useEffect, useState } from "react";
import ProjectDetail from "./ProjectDetail";
import Title from "./Title";
import ProjectNav from "./ProjectNav";
import ProjectCampaign from "./ProjectCampaign";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DataContext from "../../context/DataContext";
// import './HomepageFeaturedProject.css';

const HomepageFeaturedProject = () => {
  const [project, setProject] = useState({});
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { setRewardId, setProjectId } = useContext(DataContext);

  const handleBack = () => {
    setProjectId(projectId);
    navigate("/backing");
  }

  useEffect(() => {
    const getProject = async () => {
      const response = await axios.get(
        `http://127.0.0.1:8000/view_project/${projectId}`
      );
      setProject(response.data);
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
        handleBack={handleBack}
      />
      <ProjectNav handleBack={handleBack}/>
      <ProjectCampaign
        projectDetail={project.project_detail?.detail}
        creator={project.creator_detail}
        rewards={project.pledge_rewards}
        setRewardId={setRewardId}
      />
    </div>
  );
};

export default HomepageFeaturedProject;
