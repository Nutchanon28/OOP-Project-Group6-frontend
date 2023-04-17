import "./App.css";
import DataContext, { DataProvider } from "./context/DataContext";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import Home from "./component/Home/Home";
import OtherPage from "./component/OtherPage/OtherPage";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<OtherPage />} />
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
