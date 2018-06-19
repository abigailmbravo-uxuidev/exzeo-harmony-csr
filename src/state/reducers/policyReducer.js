import * as persistTypes from 'redux-persist/constants';
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function policyStateReducer(state = initialState.policyState, action) {
  switch (action.type) {
    case types.GET_POLICY:
      return getPolicy(state, action);
    case types.SET_POLICY:
      return setPolicy(state, action);
    case types.SET_SUMMARY_LEDGER:
      return setSummaryLedger(state, action);
    case types.SET_EFFECTIVE_DATE_CHANGE_REASONS:
      return setEffectiveDateChangeReasons(state, action);
    case types.SET_PAYMENT_HISTORY:
      return setPaymentHistory(state, action);
    case types.SET_ENDORSEMENT_HISTORY:
      return setEndorsementHistory(state, action);
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

function setEffectiveDateChangeReasons(state, action) {
  return {
    ...state,
    effectiveDateReasons: action.effectiveDateReasons
  }
}

function setPaymentHistory(state, action) {
  return {
    ...state,
    paymentHistory: action.paymentHistory
  }
}

function setEndorsementHistory(state, action) {
  return {
    ...state,
    endorsementHistory: action.endorsementHistory
  }
}

function rehydrate(state, action) {
  const policyState = ((action.payload && action.payload.policyState) ? action.payload.policyState : initialState.policyState);
  return {
    ...state,
    ...policyState
  }
}
