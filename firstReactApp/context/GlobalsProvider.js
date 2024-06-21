import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../lib/appwrite';

const GLobalContext = createContext();
//custom hook to use a global context
export const userGlobalContext = () => useContext(GLobalContext);
const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GLobalContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        setIsLoading,
        setIsLoggedIn,
        user,
        setUser,
      }}
    >
      {children}
    </GLobalContext.Provider>
  );
};

export default GlobalProvider;
