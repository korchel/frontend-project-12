import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate, Outlet,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './components/commonComponents/Header';
import LoginPage from './components/loginPage/LoginPage';
import SignupPage from './components/signupPage/SignupPage';
import Chat from './components/chatPage/ChatPage';
import NotFoundPage from './components/notFoundPage/NotFoundPage';
import { AuthProvider, useAuth } from './contexts/authContext/AuthContext.jsx';

const LoggedInRoute = () => {
  const { loggedIn } = useAuth();
  return (
    loggedIn ? <Outlet /> : <Navigate to="/login" />
  );
};

const LoggedOutRoute = () => {
  const { loggedIn } = useAuth();
  return (
    !loggedIn ? <Outlet /> : <Navigate to="/" />
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route path="/" element={<LoggedInRoute />}>
            <Route path="/" element={<Chat />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/login" element={<LoggedOutRoute />}>
            <Route path="" element={<LoginPage />} />
          </Route>
          <Route path="/signup" element={<LoggedOutRoute />}>
            <Route path="" element={<SignupPage />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
