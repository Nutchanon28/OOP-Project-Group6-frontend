import React from "react";
import { Outlet } from 'react-router-dom'
import StartProjectHeader from "./StartProjectComponent/StartProjectHeader";
import StartProjectNav from "./StartProjectComponent/StartProjectNav";

const ProjectCreatingLayout = () => {
  return (
    <div>
      <StartProjectHeader />
      <StartProjectNav />
      <Outlet />
    </div>
  );
};

export default ProjectCreatingLayout;
