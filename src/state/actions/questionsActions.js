import axios from 'axios';
import * as types from './actionTypes';
import * as errorActions from './errorActions';

export const getQuestions = (questions) => {
  return {
    type: types.GET_QUESTIONS,
    questions
  };
};

function handleError(error) {
  return (dispatch) => {
    const message = error.response && error.response.data && error.response.data.error
      ? error.response.data.error.message
      : 'There was an error';
    // dispatch the error
    return dispatch(errorActions.setAppError({ message }));
  }
}

export function getUIQuestions(step) {
  return (dispatch) => {
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
      .then(response => {
        const responseData = response.data.data;
        return dispatch(getQuestions(responseData));
      })
      .catch(error => dispatch(handleError(error)));
  };
}
