import { callService } from '../utilities/serviceRunner';
import * as types from './actionTypes';
import * as errorActions from "./errorActions";
import { convertToRateData } from "./serviceActions";


function setPolicy(policy) {
  return {
    type: types.SET_POLICY,
    policy
  }
}

function setNewRate(rate) {
  return {
    type: types.SET_RATE,
    rate
  }
}

export const updatePolicy = (update, policyNumber) => {
  const stateObj = {
    type: types.GET_POLICY,
    policyState: {
      policyNumber,
      update
    }
  };
  return stateObj;
};

export function getPolicy(policyNumber) {
  return async (dispatch) => {
    const config = {
      service: 'policy-data',
      method: 'GET',
      path: `transactions/${policyNumber}/latest`
    };

    try {
      const response = await callService(config);
      const policy = response ? response.data : {};
      dispatch(setPolicy(policy));
    } catch (error) {
      dispatch(errorActions.setAppError(error));
    }
  }
}

export function getNewRate(formData, formProps) {
  return async (dispatch) => {
      const rateData = convertToRateData(formData, formProps);
      const config = {
        service: 'rating-engine',
        method: 'POST',
        path: 'endorsement',
        data: rateData
      };
    try {
      const response = await callService(config);
      const rate = response && response.data && response.data.result ? response.data.result : {};
      dispatch(setNewRate(rate));
      return { ...rate };
    } catch (error) {
      dispatch(errorActions.setAppError(error));
      throw error;
    }
  };
}
