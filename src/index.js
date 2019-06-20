import 'react-app-polyfill/ie11';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './state/store/configureStore';
import Authentication from './components/Authentication';
import Routes from './routes';

import '../node_modules/font-awesome/scss/font-awesome.scss';
import './sass/base.scss';

const AUTH_CONFIG = {
  publicPaths: ['/login', '/logout', '/accessDenied', '/loggedOut', '/callback'],
  profileLocation: 'user_profile',
  tokenLocation: 'id_token',
  unauthRedirect: '/login'
};

const store = configureStore();

const target = document.getElementById('root');
const c = document.createComment(`Version: ${JSON.stringify(process.env.REACT_APP_VERSION)}`);
document.body.appendChild(c);
render(
  <Provider store={store}>
    <Authentication config={AUTH_CONFIG} render={({ auth }) => (<Routes auth={auth} />)} />
  </Provider>,
  target
);
