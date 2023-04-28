import { createContext, useState, useEffect } from "react";
// import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [userId, setUserId] = useState(5);
  const [projectId, setProjectId] = useState(
    localStorage.getItem("projectId") || 0
  );
  const [rewardId, setRewardId] = useState(
    localStorage.getItem("rewardId") || 0
  );
  const [projectPage, setProjectPage] = useState("Campaign");

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