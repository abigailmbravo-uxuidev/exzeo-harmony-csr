import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import _ from 'lodash';
import * as types from './actionTypes';
import * as errorActions from './errorActions';

export const handleError = (error) => {
  const message = error.response && error.response.data && error.response.data.error
   ? error.response.data.error.message
   : 'An error happened';
  return (error.message) ? error.message : message;
};

export const serviceRequest = data => ({
  type: types.SERVICE_REQUEST,
  data
});

export const runnerSetup = data => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  url: `${process.env.REACT_APP_API_URL}/svc`,
  data
});

export const addNote = (id, noteType, values) => (dispatch) => {
  const body = {
    service: 'notes.services',
    method: 'POST',
    path: 'v1/note/',
    data: {
      noteType,
      noteContent: values.noteContent,
      contactType: 'Agent',
      createdAt: new Date().getTime(),
      noteAttachments: [],
      createdBy: {},
      updatedBy: {}
    }
  };

  if (noteType === 'quoteNote') body.data.quoteNumber = id;
  if (noteType === 'policyNote') body.data.policyNumber = id;

  const axiosConfig = runnerSetup(body);

  return axios(axiosConfig).then((response) => {
    const data = { notes: response.data.result };
    return dispatch(batchActions([
      serviceRequest(data)
        // appStateActions.setAppState('modelName', 'workflowId', { submitting: false })
    ]));
  })
    .catch((error) => {
      const message = handleError(error);
      return dispatch(batchActions([
        errorActions.setAppError({ message })
        // appStateActions.setAppState('modelName', 'workflowId', { submitting: false })
      ]));
    });
};

export const getNotes = (field, value) => (dispatch) => {
  const axiosConfig = runnerSetup({
    service: 'notes.services',
    method: 'GET',
    path: `v1/notes/?${field}=${value}`
  });

  return axios(axiosConfig).then((response) => {
    const data = { notes: response.data.result };
    return dispatch(batchActions([
      serviceRequest(data)
      // appStateActions.setAppState('modelName', 'workflowId', { submitting: false })
    ]));
  })
    .catch((error) => {
      const message = handleError(error);
      return dispatch(batchActions([
        errorActions.setAppError({ message })
        // appStateActions.setAppState('modelName', 'workflowId', { submitting: false })
      ]));
    });
};

