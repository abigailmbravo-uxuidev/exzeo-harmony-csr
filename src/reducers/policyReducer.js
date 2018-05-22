import * as persistTypes from 'redux-persist/constants';
import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default function policyStateReducer(state = initialState.policyState, action) {
  switch (action.type) {
    case types.GET_POLICY:
      return getPolicy(state, action);
    case types.SET_POLICY:
      return setPolicy(state, action);
    case types.SET_SUMMARY_LEDGER:
      return setSummaryLedger(state, action);
    case types.SET_RATE:
      return setNewRate(state, action);
    case persistTypes.REHYDRATE:
      return rehydrate(state, action);
    default:
      return state;
  }
}

function getPolicy(state, action) {
  return {
    ...state,
    ...action.policyState
  }
}

function setPolicy(state, action) {
  return {
    ...state,
    policy: action.policy,
    summaryLedger: action.summaryLedger
  }
}

function setSummaryLedger(state, action) {
  return {
    ...state,
    summaryLedger: action.summaryLedger
  }
}

function setNewRate(state, action) {
  return {
    ...state,
    rate: action.rate
  }
}

function rehydrate(state, action) {
  const policyState = ((action.payload && action.payload.policyState) ? action.payload.policyState : initialState.policyState);
  return {
    ...state,
    ...policyState
  }
}
