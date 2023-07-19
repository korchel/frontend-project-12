/* eslint-disable */
import React from 'react';
import {
  BrowserRouter, Routes, Route, Link,
} from 'react-router-dom';

import Header from './components/Header';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from './components/chat/Chat';
import NotFoundPage from './components/NotFoundPage';
import AuthProvider from './contexts/AuthContext.jsx';
import ChatWSProvider from './contexts/ChatWSContext';

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
                <Chat />
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
