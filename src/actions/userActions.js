/* eslint no-undef:1 */
import axios from 'axios';
import * as types from './actionTypes';

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

export const login = creds => (dispatch) => {
  const axiosOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    url: `${process.env.REACT_APP_API_URL}/auth`,
    data: {
      username: creds.username,
      password: creds.password
    }
  };
  dispatch(authenticating('athenticating'));
  return axios(axiosOptions)
  .then((response) => {
    const token = response.data.token.id_token;
    const user = { token, isAuthenticated: true, loggedOut: false };
    dispatch(authenticated(user));
  })
  .catch(error => handleError(dispatch, error));
};

export const logout = () => (dispatch) => {
  const user = { token: undefined, isAuthenticated: false, loggedOut: true };
  dispatch(authenticated(user));
};
