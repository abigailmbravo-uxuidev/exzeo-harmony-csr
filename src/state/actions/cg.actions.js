import Promise from 'bluebird';
import { http } from '@exzeo/core-ui/src/Utilities';
import { batchActions } from 'redux-batched-actions';
import _ from 'lodash';
import * as types from './actionTypes';
import * as errorActions from './error.actions';
import * as appStateActions from './appState.actions';

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

export const clearSearchResults = (modelName, workflowData) => {
  if (!workflowData.previousTask) return { type: types.CLEAR_SEARCH_RESULTS };

  const newWorkflowData = workflowData;
  delete newWorkflowData.previousTask;

  return {
    type: types.CLEAR_SEARCH_RESULTS,
    workflowData: newWorkflowData
  };
};

// helper function to check cg errors
const checkCGError = responseData => {
  if (
    responseData.activeTask &&
    responseData.activeTask.link &&
    responseData.activeTask.link === 'error'
  ) {
    throw new Error(`CG responded with an error: ${responseData}`);
  }
};

const handleError = (dispatch, modelName, workflowId, err) => {
  const error =
    err.response &&
    err.response.data &&
    err.response.data.result &&
    err.response.data.result.error
      ? err.response.data.result.error
      : err;
  const requestId =
    err.response && err.response.data ? err.response.data.requestId : '';
  const status =
    err.response && err.response.data ? err.response.data.status : '';

  return dispatch(
    batchActions([
      errorActions.setAppError({ message: error.message, status, requestId }),
      appStateActions.setAppState(modelName, workflowId, { submitting: false })
    ])
  );
};

export const startWorkflow = (
  modelName,
  data,
  dispatchAppState = true
) => dispatch => {
  const axiosConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      modelName,
      data
    },
    url: `${process.env.REACT_APP_API_URL}/cg/start?${modelName}`
  };

  return http(axiosConfig)
    .then(response => {
      const responseData = response.data.data;
      // check to see if the cg has returned an error as an ok
      checkCGError(responseData);
      if (dispatchAppState) {
        return dispatch(
          batchActions([
            start(modelName, responseData),
            errorActions.clearAppError()
          ])
        );
      }
      dispatch(errorActions.clearAppError());
      return dispatch(start(modelName, responseData));
    })
    .catch(error => handleError(dispatch, modelName, null, error));
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

export const completeTask = (
  modelName,
  workflowId,
  stepName,
  data,
  dispatchAppState = true
) => dispatch => {
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

  return http(axiosConfig)
    .then(response => {
      const responseData = response.data.data;
      // check to see if the cg has returned an error as an ok
      checkCGError(responseData);
      if (dispatchAppState) {
        return dispatch(
          batchActions([
            complete(modelName, responseData),
            appStateActions.setAppState(modelName, workflowId, {
              submitting: false
            })
          ])
        );
      }
      return dispatch(complete(modelName, responseData));
    })
    .catch(error => handleError(dispatch, modelName, workflowId, error));
};

export const batchCompleteTask = (
  modelName,
  workflowId,
  stepsWithData,
  dispatchAppState = true
) => dispatch => {
  const axiosConfigs = [];
  _.each(stepsWithData, step => {
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

  return Promise.reduce(
    axiosConfigs,
    (response, axiosConfig) => http(axiosConfig),
    0
  )
    .then(response => {
      const responseData = response.data.data;
      // check to see if the cg has returned an error as an ok
      checkCGError(responseData);
      if (dispatchAppState) {
        dispatch(
          batchActions([
            complete(modelName, responseData),
            appStateActions.setAppState(modelName, workflowId, {
              submitting: false
            })
          ])
        );
      }
      dispatch(complete(modelName, responseData));
    })
    .catch(error => handleError(dispatch, modelName, workflowId, error));
};

export const moveToTask = (
  modelName,
  workflowId,
  stepName,
  dispatchAppState = true
) => dispatch => {
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
  return http(axiosConfig)
    .then(response => {
      const responseData = response.data.data;
      // check to see if the cg has returned an error as an ok
      checkCGError(responseData);
      const instanceId = responseData.modelInstanceId;
      if (dispatchAppState) {
        return dispatch(
          batchActions([
            complete(modelName, responseData),
            appStateActions.setAppState(modelName, instanceId, {
              submitting: false
            })
          ])
        );
      }
      return dispatch(complete(modelName, responseData));
    })
    .catch(error => handleError(dispatch, modelName, workflowId, error));
};

export const moveToTaskAndExecuteComplete = (
  modelName,
  workflowId,
  stepName,
  completeStep,
  dispatchAppState = true
) => dispatch => {
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
  let newInstanceId = '';
  return http(axiosConfig)
    .then(response => {
      const responseData = response.data.data;
      // check to see if the cg has returned an error as an ok
      checkCGError(responseData);
      newInstanceId = responseData.modelInstanceId;
      const axiosConfig2 = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        url: `${process.env.REACT_APP_API_URL}/cg/complete`,
        data: {
          workflowId: newInstanceId,
          stepName: completeStep.stepName,
          data: completeStep.data
        }
      };
      return http(axiosConfig2);
    })
    .then(response => {
      const responseData = response.data.data;
      // check to see if the cg has returned an error as an ok
      checkCGError(responseData);
      if (dispatchAppState) {
        return dispatch(
          batchActions([
            complete(modelName, responseData),
            appStateActions.setAppState(modelName, newInstanceId, {
              submitting: false
            })
          ])
        );
      }
      return dispatch(complete(modelName, responseData));
    })
    .catch(error => handleError(dispatch, modelName, workflowId, error));
};
