import * as types from './actionTypes';

export const updatePolicy = (update, policyNumber) => {
  const stateObj = {
    type: types.POLICYID,
    policyState: {
      policyNumber,
      update
    }
  };
  return stateObj;
};

export const dispatchGetLatestPolicy = (update, policyNumber) => dispatch => dispatch(updatePolicy(update, policyNumber));
