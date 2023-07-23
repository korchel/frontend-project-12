import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './components/Header';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Chat from './components/chatPage/Chat';
import NotFoundPage from './components/NotFoundPage';
import AuthProvider from './contexts/AuthContext.jsx';
import useAuth from './hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return (
    auth.loggedIn ? children : <Navigate to="/login" />
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            )}
          />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
