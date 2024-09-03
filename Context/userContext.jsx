import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    if (!loggedUser) {
      setLoggedUser({
        username: "guest",
        name: "Guest User",
        avatarUrl:
          "https://www.shutterstock.com/image-vector/avatar-guest-icon-260nw-1351831589.jpg", // Valid avatar URL
      });
    }
  }, [loggedUser]);

  const logout = () => {
    setLoggedUser(null);
  };

  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
