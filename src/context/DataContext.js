import { createContext, useState, useEffect } from "react";
// import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [userId, setUserId] = useState(1);
  const [projectId, setProjectId] = useState(
    localStorage.getItem("projectId") || 0
  );
  const [rewardId, setRewardId] = useState(
    localStorage.getItem("rewardId") || 0
  );
  const [projectPage, setProjectPage] = useState("Campaign");
  // const [recommendedProjects, setRecommendedProjects] = useState([]);

  // useEffect(() => {
  //   const getProjects = async () => {
  //     const response = await axios.get(
  //       "http://127.0.0.1:8000/view_all_project"
  //     );
  //     setRecommendedProjects(response.data.projects_detail);
  //     console.log(response.data);
  //   };
  //   getProjects();
  // }, []);

  useEffect(() => {
    localStorage.setItem("projectId", projectId);
  }, [projectId]);

  useEffect(() => {
    localStorage.setItem("rewardId", rewardId);
  }, [rewardId]);

  return (
    <DataContext.Provider
      value={{
        userId,
        setUserId,
        projectId,
        setProjectId,
        rewardId,
        setRewardId,
        projectPage,
        setProjectPage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
