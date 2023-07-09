/* eslint-disable functional/no-expression-statements */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  BrowserRouter, Routes, Route, Link,
} from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';

import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from './components/chat/Chat';
import NotFoundPage from './components/NotFoundPage';
import AuthProvider from './contexts/AuthContext.jsx';
import ChatWSProvider from './contexts/ChatWSContext';
import useAuth from './hooks/useAuth';

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
const App = ({ webSocket }) => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Navbar bg="wight" expand="lg">
          <Navbar.Brand>Hexlet Chat</Navbar.Brand>
          <LogOutButton />
        </Navbar>
        <Routes>
          <Route
            path="/"
            element={(
              <ChatWSProvider webSocket={webSocket}>
                <Chat />
              </ChatWSProvider>
            )}
          />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
