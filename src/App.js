import "./App.css";
import DataContext, { DataProvider } from "./context/DataContext";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import Home from "./component/Home/Home";
import HomepageFeaturedProject from "./component/Project/HomepageFeaturedProject"
import PledgeSummary from "./component/PledgeSummary/PledgeSummary";


function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="project/:projectId" element={<HomepageFeaturedProject />} />
          <Route path="backing" element={<PledgeSummary />} />
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
