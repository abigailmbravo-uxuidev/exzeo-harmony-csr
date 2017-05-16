/* eslint no-undef:1 */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Cookies } from 'react-cookie';
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

  const user = { error: message, isAuthenticated: false, loggedOut: false };

  // dispatch the error
  return dispatch(authenticateError(user));
};

export const decodeToken = (token) => {
  const decoded = jwtDecode(token);
  console.log(decoded);
  return decoded;
};

export const validateLogin = () => (dispatch) => {
  const token = cookies.get('harmony-id-token');
  if (token) {
    const profile = decodeToken(token);
    const user = { token, profile, isAuthenticated: true, loggedOut: false };
    console.log('user', user);
    return dispatch(authenticated(user));
  }
  return handleError(dispatch, 'User is not authenticated');
};

export const logout = () => (dispatch) => {
  const user = { token: undefined, profile: undefined, isAuthenticated: false, loggedOut: true };
  // remove the auth header to every request
  axios.defaults.headers.common['authorization'] = undefined; // eslint-disable-line
  cookies.set('harmony-id-token', undefined, { expires: new Date('Thu, 01 Jan 1970 00:00:00 GMT') });
  console.log('logout');
  dispatch(authenticated(user));
};
