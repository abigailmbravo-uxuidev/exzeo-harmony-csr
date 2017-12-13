import * as types from './actionTypes';

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

export const getPolicyEffectiveDateReasons = (effectiveDateReasons) => {
  const stateObj = {
    type: types.GET_EFFECTIVE_DATE_REASONS,
    effectiveDateReasons
  };
  return stateObj;
};

export const dispatchGetLatestPolicy = (update, policyNumber) => dispatch => dispatch(updatePolicy(update, policyNumber));
