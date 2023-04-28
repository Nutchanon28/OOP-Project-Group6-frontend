import "./App.css";
import React from "react";
import DataContext, { DataProvider } from "./context/DataContext";
import { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import Home from "./component/Home/Home";
import StartProject from "./component/StartProjectComponent/StartProject";
import StartProjectNav from "./component/StartProjectComponent/StartProjectNav";
import StartProjectHeader from "./component/StartProjectComponent/StartProjectHeader";
import SettingPage from "./component/SettingPage/SettingPage";

const AuthContext = React.createContext();

function App() {

  const [auth, setAuth] = useState({
    id: 5,
    currentEditProject: null
})

  return (
    <div className="App">
      <DataProvider>
        <AuthContext.Provider value={{auth, setAuth}}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/start-project/*" element={<StartProjectHeader/>}/>
            <Route path="SettingPage/*" element={<SettingPage />} />
          </Routes>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/start-project/*" element={<StartProject />} />
          </Routes>
        </AuthContext.Provider>
      </DataProvider>
    </div>
  );
}
export { AuthContext }
export default App;
