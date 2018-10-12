import { emptyObject } from '@exzeo/core-ui';

export const getPolicy = state => state.policyState.policy;
export const getSummaryLedger = state => state.policyState.summaryLedger;
export const getPaymentOptions = state => state.policyState.paymentOptions;
export const getPaymentHistory = state => state.policyState.paymentHistory;

export const getQuote = state => state.quoteState.quote || emptyObject;

export const getDiaries = state => state.diaries;

export const getAgencies = state => state.service.agencies;

export const getAppState = state => state.appState || emptyObject;

export const getCGState = state => state.cg || emptyObject;
