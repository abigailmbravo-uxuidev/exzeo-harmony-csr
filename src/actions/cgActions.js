import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import _ from 'lodash';
import Promise from 'bluebird';
import * as types from './actionTypes';
import * as errorActions from './errorActions';
import * as appStateActions from './appStateActions';

export const start = (modelName, workflowData) => {
  const newWorkflowData = {};
  newWorkflowData[modelName] = {};
  newWorkflowData[modelName].data = workflowData;
  const stateObj = {
    type: types.CG_START,
    workflowData: newWorkflowData
  };
  return stateObj;
};

// export const activeTask = (modelName, workflowData) => {
//   const newWorkflowData = {};
//   newWorkflowData[modelName] = {};
//   newWorkflowData[modelName].data = workflowData;
//   const stateObj = {
//     type: types.CG_ACTIVE_TASK,
//     workflowData: newWorkflowData
//   };
//   return stateObj;
// };

export const complete = (modelName, workflowData) => {
  const newWorkflowData = {};
  newWorkflowData[modelName] = {};
  newWorkflowData[modelName].data = workflowData;
  const stateObj = {
    type: types.CG_COMPLETE,
    workflowData: newWorkflowData
  };
  return stateObj;
};

// helper function to check cg errors
const checkCGError = (responseData) => {
  if (responseData.activeTask && responseData.activeTask.link && responseData.activeTask.link === 'error') {
    throw new Error(`CG responded with an error: ${responseData}`);
  }
};

const handleError = (dispatch, error) => {
  let message = 'An error happened';
  console.log(error.response);
  if (error.response) {
    // The request was made, but the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    message = error.response.data.error.message;
  }
  // Something happened in setting up the request that triggered an Error
  message = (error.message) ? error.message : message;
  // dispatch the error
  return dispatch(errorActions.setAppError({ message }));
};

export const startWorkflow = (modelName, data, dispatchAppState = true) => (dispatch) => {
  const axiosConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      modelName,
      data
    },
    url: `${process.env.REACT_APP_API_URL}/cg/start`
  };

  return axios(axiosConfig)
    .then((response) => {
      const responseData = response.data.data;
      // check to see if the cg has returned an error as an ok
      checkCGError(responseData);
      const instanceId = responseData.modelInstanceId;
      if (dispatchAppState) {
        return dispatch(batchActions([start(modelName, responseData),
          errorActions.clearAppError(),
          appStateActions.setAppState(modelName, instanceId, {})
        ]));
      }
      dispatch(errorActions.clearAppError());
      return dispatch(start(modelName, responseData));
    })
    .catch(error => handleError(dispatch, error));
};

// export const activeTasks = (modelName, workflowId) => (dispatch) => {
//   const axiosConfig = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     url: `${process.env.REACT_APP_API_URL}/cg/activeTasks`,
//     data: {
//       workflowId
//     }
//   };
//   return axios(axiosConfig)
//     .then((response) => {
//       const responseData = response.data.data;
//       // check to see if the cg has returned an error as an ok
//       checkCGError(responseData);
//       return dispatch(activeTask(modelName, response.data.data));
//     })
//     .catch(error => handleError(dispatch, error));
// };

export const completeTask = (modelName, workflowId, stepName, data, dispatchAppState = true) => (dispatch) => {
  const axiosConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    url: `${process.env.REACT_APP_API_URL}/cg/complete`,
    data: {
      workflowId,
      stepName,
      data
    }
  };
  return axios(axiosConfig)
    .then((response) => {
      const responseData = response.data.data;
      // check to see if the cg has returned an error as an ok
      checkCGError(responseData);
      if (dispatchAppState) {
        return dispatch(batchActions([complete(modelName, responseData),
          appStateActions.setAppState(modelName, workflowId, {
            submitting: false
          })
        ]));
      }
      return dispatch(complete(modelName, responseData));
    })
    .catch(error => handleError(dispatch, error));
};

export const batchCompleteTask = (modelName, workflowId, stepsWithData, dispatchAppState = true) => (dispatch) => {
  const axiosConfigs = [];
  _.each(stepsWithData, (step) => {
    const axiosConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/cg/complete`,
      data: {
        workflowId,
        stepName: step.name,
        data: step.data
      }
    };
    axiosConfigs.push(axiosConfig);
  });
  return Promise.reduce(axiosConfigs, (response, axiosConfig) => axios(axiosConfig), 0)
    .then((response) => {
      const responseData = response.data.data;
      // check to see if the cg has returned an error as an ok
      checkCGError(responseData);
      if (dispatchAppState) {
        dispatch(batchActions([complete(modelName, responseData),
          appStateActions.setAppState(modelName, workflowId, {
            submitting: false
          })
        ]));
      }
      dispatch(complete(modelName, responseData));
    })
    .catch(error => handleError(dispatch, error));
};

export const moveToTask = (modelName, workflowId, stepName, dispatchAppState = true) => (dispatch) => {
  const axiosConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    url: `${process.env.REACT_APP_API_URL}/cg/moveToTask`,
    data: {
      workflowId,
      stepName
    }
  };
  return axios(axiosConfig)
    .then((response) => {
      const responseData = response.data.data;
      // check to see if the cg has returned an error as an ok
      checkCGError(responseData);
      const instanceId = responseData.modelInstanceId;
      if (dispatchAppState) {
        return dispatch(batchActions([complete(modelName, responseData),
          appStateActions.setAppState(modelName, instanceId, {
            submitting: false
          })
        ]));
      }
      return dispatch(complete(modelName, responseData));
    })
    .catch(error => handleError(dispatch, error));
};

export const moveToTaskAndExecuteComplete = (modelName, workflowId, stepName, completeStep, dispatchAppState = true) => (dispatch) => {
  const axiosConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    url: `${process.env.REACT_APP_API_URL}/cg/moveToTask`,
    data: {
      workflowId,
      stepName
    }
  };
  return axios(axiosConfig)
    .then((response) => {
      const responseData = response.data.data;
      // check to see if the cg has returned an error as an ok
      checkCGError(responseData);
      const instanceId = responseData.modelInstanceId;
      const axiosConfig2 = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        url: `${process.env.REACT_APP_API_URL}/cg/complete`,
        data: {
          workflowId: instanceId,
          stepName: completeStep.stepName,
          data: completeStep.data
        }
      };
      return axios(axiosConfig2);
    })
    .then((response) => {
      const responseData = response.data.data;
      // check to see if the cg has returned an error as an ok
      checkCGError(responseData);
      if (dispatchAppState) {
        return dispatch(batchActions([complete(modelName, responseData),
          appStateActions.setAppState(modelName, workflowId, {
            submitting: false
          })
        ]));
      }
      return dispatch(complete(modelName, responseData));
    })
    .catch(error => handleError(dispatch, error));
};
