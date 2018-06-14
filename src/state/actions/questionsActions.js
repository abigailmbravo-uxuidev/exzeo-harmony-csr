import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import * as types from './actionTypes';
import * as errorActions from './errorActions';

export const getQuestions = (questions) => {
  return {
    type: types.GET_QUESTIONS,
    questions
  };
};

const handleError = (dispatch, error) => {
  const message = error.response && error.response.data && error.response.data.error
    ? error.response.data.error.message
    : 'There was an error';
  // dispatch the error
  return dispatch(batchActions([
    errorActions.setAppError({ message })
  ]));
};

export const getUIQuestions = step => (dispatch) => {
  const axiosConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    url: `${process.env.REACT_APP_API_URL}/questions`,
    data: {
      step
    }
  };

  return axios(axiosConfig)
    .then((response) => {
      const responseData = response.data.data;
      return dispatch(getQuestions(responseData));
    })
    .catch(error => handleError(dispatch, error));
};
