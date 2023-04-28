import "./App.css";
import React from "react";
import { DataProvider } from "./context/DataContext";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import Home from "./component/Home/Home";
import HomepageFeaturedProject from "./component/Project/HomepageFeaturedProject";
import PledgeSummary from "./component/PledgeSummary/PledgeSummary";
import StartProject from "./component/StartProjectComponent/StartProject";
import StartProjectHeader from "./component/StartProjectComponent/StartProjectHeader";
import CreatedProject from "./component/Home/CreatedProject";
import SettingPage from "./component/SettingPage/SettingPage";
import Layout from "./component/Layout";
import ProjectCreatingLayout from "./component/ProjectCreatingLayout"


function App() {

  return (
    <div className="App">
      <DataProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route 
                path="project/:projectId"
                element={<HomepageFeaturedProject />}
              />
              <Route path="backing" element={<PledgeSummary />} />
              <Route path="setting/*" element={<SettingPage />} />
              <Route path="/created-project/*" element={<CreatedProject />} />
            </Route>
            <Route path="/start-project/*" element={<ProjectCreatingLayout />} >
            <Route index element={<StartProject />} />
            </Route>
          </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
