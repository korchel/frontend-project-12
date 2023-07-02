/* eslint-disable functional/no-expression-statements */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';

import './index.css';
import App from './App';
import store from './slices/index.js';

const app = () => {
  const webSocket = io();
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Provider store={store}>
      <App webSocket={webSocket} />
    </Provider>,
  );
};

app();
