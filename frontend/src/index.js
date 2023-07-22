/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';


import './index.css';
import store from './slices/index.js';
import init from './init';

const app = async () => {
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const vdom = await init();
  root.render(
    <Provider store={store}>
      {vdom}
    </Provider>,
  );
};

app();
