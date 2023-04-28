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
import CreatedProject from "./component/Home/CreatedProject";


function App() {

  return (
    <div className="App">
      <DataProvider>
          <Routes>
            <Route path="/" element={<Header />}/>
            <Route path="/start-project/*" element={<StartProjectHeader/>}/>
            <Route path="/created-project/*" element={<Header />}/>
          </Routes>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/start-project/*" element={<StartProject />} />
            <Route path="/created-project/*" element={<CreatedProject />} />
          </Routes>
      </DataProvider>
    </div>
  );
}
export default App;
