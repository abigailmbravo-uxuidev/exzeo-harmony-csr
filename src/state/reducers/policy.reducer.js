import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function policyStateReducer(
  state = initialState.policyState,
  action
) {
  switch (action.type) {
    case types.SET_POLICY:
      return setPolicy(state, action);
    case types.SET_CLAIMS:
      return setClaims(state, action);
    case types.SET_SUMMARY_LEDGER:
      return setSummaryLedger(state, action);
    case types.SET_EFFECTIVE_DATE_CHANGE_REASONS:
      return setEffectiveDateChangeReasons(state, action);
    case types.SET_PAYMENT_HISTORY:
      return setPaymentHistory(state, action);
    case types.SET_BILLING_OPTIONS:
      return setBillingOptions(state, action);
    case types.SET_CANCEL_OPTIONS:
      return setCancelOptions(state, action);
    case types.SET_PAYMENT_OPTIONS:
      return setPaymentOptions(state, action);
    case types.RESET_POLICY:
      return resetPolicyState(state, action);
    case types.SET_POLICIES_FOR_AGENCY:
      return setPoliciesForAgency(state, action);
    default:
      return state;
  }
}

function setPolicy(state, action) {
  return {
    ...state,
    policyID: action.policy.policyID,
    policy: action.policy,
    summaryLedger: action.summaryLedger
  };
}

function setClaims(state, action) {
  return {
    ...state,
    claims: action.claims
  };
}

function setSummaryLedger(state, action) {
  return {
    ...state,
    summaryLedger: action.summaryLedger
  };
}

function setEffectiveDateChangeReasons(state, action) {
  return {
    ...state,
    effectiveDateReasons: action.effectiveDateReasons
  };
}

function setPaymentHistory(state, action) {
  return {
    ...state,
    paymentHistory: action.paymentHistory
  };
}

function setBillingOptions(state, action) {
  return {
    ...state,
    billingOptions: action.billingOptions
  };
}

function setCancelOptions(state, action) {
  return {
    ...state,
    cancelOptions: action.cancelOptions
  };
}

function setPaymentOptions(state, action) {
  return {
    ...state,
    paymentOptions: action.paymentOptions
  };
}

function setPoliciesForAgency(state, action) {
  return {
    ...state,
    agencyPolicies: action.agencyPolicies
  };
}

function resetPolicyState(state) {
  return {
    ...state,
    ...initialState.policyState
  };
}
