import { convertToRateData } from "../utilities/endorsementModel";
import { callService } from '../utilities/serviceRunner';
import * as types from './actionTypes';
import * as errorActions from "./errorActions";


function setPolicy(policy, summaryLedger) {
  return {
    type: types.SET_POLICY,
    policy,
    summaryLedger
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
    try {
      const [policy, summaryLedger ] = await Promise.all([
        fetchPolicy(policyNumber),
        fetchSummaryLedger(policyNumber)
      ]);

      dispatch(setPolicy(policy, summaryLedger));
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

async function fetchPolicy(policyNumber) {
  const config = {
    service: 'policy-data',
    method: 'GET',
    path: `transactions/${policyNumber}/latest`
  };

  try {
    const response = await callService(config);
    return response ? response.data : {};
  } catch (error) {
    throw error;
  }
}

async function fetchSummaryLedger(policyNumber) {
  const config = {
    service: 'billing',
    method: 'GET',
    path: `summary-ledgers/${policyNumber}/latest`
  };

  try {
    const response = await callService(config);
    return response && response.data && response.data.result ? response.data.result : {};
  } catch (error) {
    throw error;
  }
}
