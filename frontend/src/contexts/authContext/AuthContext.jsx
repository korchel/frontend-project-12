import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('userId'));

  const { username, token } = loggedIn
    ? JSON.parse(localStorage.getItem('userId'))
    : {};

  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut, username, token }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
