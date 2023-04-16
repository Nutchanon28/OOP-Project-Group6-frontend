import { createContext, useState, useEffect } from "react";
// import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [userId, setUserId] = useState(1);

  return (
    <DataContext.Provider value={{ userId, setUserId }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
