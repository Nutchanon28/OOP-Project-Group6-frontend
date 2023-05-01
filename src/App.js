import "./App.css";
import React from "react";
import { DataProvider } from "./context/DataContext";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import Home from "./component/Home/Home";
import OtherPage from "./component/OtherPage/OtherPage";
import HomepageFeaturedProject from "./component/Project/HomepageFeaturedProject";
import PledgeSummary from "./component/PledgeSummary/PledgeSummary";
import StartProject from "./component/StartProjectComponent/StartProject";
import StartProjectHeader from "./component/StartProjectComponent/StartProjectHeader";
import CreatedProject from "./component/Home/CreatedProject";
import SettingPage from "./component/SettingPage/SettingPage";
import Layout from "./component/Layout";
import ProjectCreatingLayout from "./component/ProjectCreatingLayout"
import SetFunding from "./component/StartProjectComponent/SetFunding";
import RewardTiers from "./component/StartProjectComponent/RewardTiers";
import AddReward from "./component/StartProjectComponent/AddReward";
import SetDescription from "./component/StartProjectComponent/SetDescription";
import Payment from "./component/StartProjectComponent/Payment";


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
              <Route path="other" element={<OtherPage />} />
              <Route path="/created-project/*" element={<CreatedProject />} />
            </Route>
            <Route path="/start-project/*" element={<ProjectCreatingLayout />} >
              <Route index element={<StartProject />} />
              <Route path="set-funding" element={<SetFunding />}/>
              <Route path="reward-tiers" element={<RewardTiers />}/>
              <Route path='reward-tiers/add-reward' element={<AddReward />} />
              <Route path="set-description" element={<SetDescription />}/>
              <Route path="set-payment" element={<Payment />}/>
            </Route>
          </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
