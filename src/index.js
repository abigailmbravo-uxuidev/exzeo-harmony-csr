// app.js runs on localhost:8000
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './routes';
import configureStore from './state/store/configureStore';

import '../node_modules/font-awesome/css/font-awesome.min.css';
import './css/base.css';

const store = configureStore();

const holder = document.getElementById('root');
const c = document.createComment(`Version: ${JSON.stringify(process.env.REACT_APP_VERSION)}`);
document.body.appendChild(c);
render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  holder
);
