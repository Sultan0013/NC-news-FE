import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedUser, setLoggedUserState] = useState(() => {
    const stored = localStorage.getItem("loggedUser");
    return stored ? JSON.parse(stored) : null;
  });

  const setLoggedUser = (user) => {
    setLoggedUserState(user);
    if (user) {
      localStorage.setItem("loggedUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("loggedUser");
    }
  };

  const logout = () => {
    setLoggedUserState(null);
    localStorage.removeItem("loggedUser");
  };

  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
