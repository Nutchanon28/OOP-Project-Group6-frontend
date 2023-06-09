import { createContext, useState, useEffect } from "react";
// import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId") || 0);
  const [projectId, setProjectId] = useState(
    localStorage.getItem("projectId") || 0
  );
  const [rewardId, setRewardId] = useState(
    localStorage.getItem("rewardId") || 0
  );
  const [isEdit, setIsEdit] = useState(localStorage.getItem("isEdit") || false);
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
    localStorage.setItem("userId", userId);
  }, [userId]);

  useEffect(() => {
    localStorage.setItem("projectId", projectId);
  }, [projectId]);

  useEffect(() => {
    localStorage.setItem("rewardId", rewardId);
  }, [rewardId]);
  useEffect(() => {
    localStorage.setItem("isEdit", isEdit);
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
        isEdit,
        setIsEdit,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
