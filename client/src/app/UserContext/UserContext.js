import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const useGlobalContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    console.log('userContext');
  }, []);
 


  return (
    <UserContext.Provider value={{ content, setContent }}>
      {children}
    </UserContext.Provider>
  );
};
