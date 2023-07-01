/* eslint-disable quotes */
/* eslint-disable functional/no-expression-statements */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from "react";
import {
  BrowserRouter, Routes, Route, Link,
} from "react-router-dom";
import { Button, Navbar } from "react-bootstrap";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import MainPage from "./components/MainPage";
import NotFoundPage from "./components/NotFoundPage";
import AuthContext from "./contexts/index.js";
import useAuth from "./hooks";

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    console.log(loggedIn);
    localStorage.removeItem("userId");
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const LogOutButton = () => {
  const auth = useAuth();
  return (
    auth.loggedIn && (
      <Button as={Link} to="/login" onClick={auth.logOut}>
        Log out
      </Button>
    )
  );
};
const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Hexlet Chat</Navbar.Brand>
        <LogOutButton />
      </Navbar>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
