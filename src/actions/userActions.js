/* eslint no-undef:1 */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Cookies } from 'react-cookie';
import _ from 'lodash';
import * as types from './actionTypes';

const cookies = new Cookies();

export const authenticating = state => ({
  type: types.AUTHENTICATING,
  state
});

export const authenticated = user => ({
  type: types.AUTHENTICATED,
  user
});

export const authenticateError = user => ({
  type: types.AUTHENTICATE_ERROR,
  user
});

const handleError = (dispatch, error) => {
  let message = 'An error happened';
  console.log(error.config);
  if (error.response) {
    // The request was made, but the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    message = error.response;
  }
  // Something happened in setting up the request that triggered an Error
  message = (error.message) ? error.message : message;

  const user = { error: message, accessDenied: (error.accessDenied) ? true : undefined, isAuthenticated: false, loggedOut: false };

  // dispatch the error
  return dispatch(authenticateError(user));
};

const getDomain = () => {
  const url = window.location.hostname.replace(/^.*?([^\.]+\.[^\.]+)$/, '$1'); // eslint-disable-line
  const primaryDomain = (url.indexOf('localhost') > -1) ? 'localhost' : `.${url}`;
  return primaryDomain;
};

export const decodeToken = (token) => {
  const decoded = jwtDecode(token);
  return decoded;
};

const checkIfCSRGroup = (profile) => {
  const groups = profile.groups;
  if (!groups) {
    return false;
  }
  // TODO: lock it down by company code
  const csrGroup = _.chain(groups).flatten().filter(item => item.extendedProperties.isCSR).value();
  return (csrGroup && csrGroup.length > 0);
};

const clearCookie = () => {
  axios.defaults.headers.common['authorization'] = undefined; // eslint-disable-line
  cookies.set('harmony-id-token', undefined, { expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT'), domain: getDomain() });
};

export const validateLogin = () => (dispatch) => {
  const token = cookies.get('harmony-id-token');
  if (token) {
    const profile = decodeToken(token);
    if (checkIfCSRGroup(profile)) {
      const user = { token, profile, isAuthenticated: true, loggedOut: false, accessDenied: undefined };
      return dispatch(authenticated(user));
    }
    clearCookie();
    return handleError(dispatch, { message: 'Access denied', accessDenied: true });
  }
  return handleError(dispatch, { message: 'User is not authenticated' });
};

export const logout = () => (dispatch) => {
  const user = { token: undefined, profile: undefined, isAuthenticated: false, loggedOut: true };
  clearCookie();
  dispatch(authenticated(user));
};
