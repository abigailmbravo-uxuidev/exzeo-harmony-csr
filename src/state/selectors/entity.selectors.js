import { emptyObject } from '@exzeo/core-ui';

// POLICY
export const getPolicy = state => state.policyState.policy;
export const getSummaryLedger = state => state.policyState.summaryLedger;
export const getPaymentOptions = state => state.policyState.paymentOptions;
export const getPaymentHistory = state => state.policyState.paymentHistory;
export const getAgencyPolicies = state => state.policyState.agencyPolicies;
export const getEffectiveDateChangeReasons = state =>
  state.policyState.effectiveDateReasons;
// QUOTE
export const getQuote = state => state.quoteState.quote || emptyObject;
// DIARY
export const getDiaries = state => state.diaries;
export const getDiaryOptions = state => state.list.diaryOptions;
// AGENCY
export const getAgencies = state => state.service.agencies;
// APP-STATE [DEPRECATED]
export const getAppState = state => state.appState || emptyObject;
