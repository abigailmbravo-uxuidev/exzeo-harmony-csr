import * as types from './actionTypes';

export const updatePolicy = (update, policyId) => {
  const stateObj = {
    type: types.POLICYID,
    policyState: {
      policyId,
      update
    }
  };
  return stateObj;
};

export const dispatchGetLatestPolicy = (update, policyId) => dispatch => dispatch(updatePolicy(update, policyId));
