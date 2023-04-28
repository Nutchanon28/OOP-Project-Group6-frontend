import React from "react";
import { Outlet } from 'react-router-dom'
import StartProjectHeader from "./StartProjectComponent/StartProjectHeader";

const ProjectCreatingLayout = () => {
  return (
    <div>
      <StartProjectHeader />
      <Outlet />
    </div>
  );
};

export default ProjectCreatingLayout;
