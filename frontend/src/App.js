/* eslint-disable */
import React from 'react';
import {
  BrowserRouter, Routes, Route, Link, Navigate
} from 'react-router-dom';

import Header from './components/Header';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from './components/chatPage/Chat';
import NotFoundPage from './components/NotFoundPage';
import AuthProvider from './contexts/AuthContext.jsx';
import ChatWSProvider from './contexts/ChatWSContext';
import useAuth from './hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return (
    auth.loggedIn ? children : <Navigate to="/login" />
  )
}

const App = ({ webSocket }) => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route
            path="/"
            element={(
              <ChatWSProvider webSocket={webSocket}>
                <PrivateRoute>
                  <Chat />
                </PrivateRoute>
              </ChatWSProvider>
            )}
          />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
