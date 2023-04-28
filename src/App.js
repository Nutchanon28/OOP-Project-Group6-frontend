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
import SettingPage from "./component/SettingPage/SettingPage";
import Layout from "./component/Layout";
import ProjectCreatingLayout from "./component/ProjectCreatingLayout"

const AuthContext = React.createContext();

function App() {
  const [auth, setAuth] = useState({
    id: 1,
    currentEditProject: null,
  });

  return (
    <div className="App">
      <DataProvider>
        <AuthContext.Provider value={{ auth, setAuth }}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route 
                path="project/:projectId"
                element={<HomepageFeaturedProject />}
              />
              <Route path="backing" element={<PledgeSummary />} />
              <Route path="setting/*" element={<SettingPage />} />
            </Route>
            <Route path="/start-project/*" element={<ProjectCreatingLayout />} >
            <Route index element={<StartProject />} />
            </Route>
          </Routes>
        </AuthContext.Provider>
      </DataProvider>
    </div>
  );
}
export { AuthContext };
export default App;
