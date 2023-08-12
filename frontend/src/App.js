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

const PrivateRoute = () => {
  const auth = useAuth();
  return (
    auth.loggedIn ? <Outlet /> : <Navigate to="/login" />
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Chat />}></Route>
          </Route>
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
