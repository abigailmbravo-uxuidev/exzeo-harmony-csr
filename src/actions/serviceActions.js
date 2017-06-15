import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import _ from 'lodash';
import Promise from 'bluebird';
import * as types from './actionTypes';
import * as errorActions from './errorActions';
import * as appStateActions from './appStateActions';


export const serviceTask = (newData) => {
  const stateObj = {
    type: types.RUN_SERVICE,
    serviceData: newData
  };
  return stateObj;
};

const handleError = (error) => {
  const message = error.response ? error.response.data.error.message : 'An error happened';
  return (error.message) ? error.message : message;
};

export const runService = (method, service, servicePath, data) => (dispatch) => {
  const axiosConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    url: `${process.env.REACT_APP_API_URL}/svc`,
    data:  {
        method, // 'GET', 'POST', 'PUT'
        service, // agency.services
        path: servicePath, // v1/agency/TTIC/FL/20000
        data /* {
            "_id": "${singleQuote.result._id}",
            "quoteState": "Quote Stopped"
        }*/
    }
  };

  return Promise.resolve(axios(axiosConfig))
    .then((response) => {
      return dispatch(serviceTask(response));
    })
    .catch(error => {
      const message = handleError(error);
      return dispatch(batchActions([errorActions.setAppError({ message })]));
    });
};
