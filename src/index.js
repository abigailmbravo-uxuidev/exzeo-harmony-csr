// app.js runs on localhost:8000
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { asyncSessionStorage } from 'redux-persist/storages';
import Routes from './routes';
import { client } from './reducers';
import configureStore from './store/configureStore';

import '../node_modules/font-awesome/css/font-awesome.min.css';
import './css/typtap-theme.css';

const store = configureStore();
persistStore(store, { storage: asyncSessionStorage });

const holder = document.getElementById('root');
render(
  <Provider client={client} store={store}><Routes store={store} /></ Provider>,
  holder
);
