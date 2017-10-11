import * as persistTypes from 'redux-persist/constants';
import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default function policyStateReducer(state = initialState.policyState, action) {
  let newState = state;
  switch (action.type) {
    case types.POLICYID:
      console.log('action', action);
      newState = (action.policyState) ? action.policyState : newState;
      return newState;
    case persistTypes.REHYDRATE:
      const rehydrate = (action.payload && action.payload.policy && action.payload.policy.policyId) ? action.payload.policy : null;
      newState = rehydrate || ((action.policyState) ? action.policyState : newState);
      console.log('REHYDRATE', newState);

      return newState;
    default:
      return state;
  }
}

