import * as types from '../actions/actionTypes';
import initialState from './initialState';
import policyStateReducer from './policy.reducer';

describe('Policy State Reducer', () => {
  it('should call policyStateReducer SET_POLICY', () => {
    const state = initialState.policyState;
    const inputProps = {
      billingOptions: {},
      cancelOptions: [],
      effectiveDateReasons: [],
      endorsementHistory: [],
      paymentHistory: [],
      paymentOptions: [],
      policy: {},
      policyID: undefined,
      summaryLedger: undefined
    };
    const action = {
      type: types.SET_POLICY,
      policyState: inputProps,
      policyID: '123',
      policy: {}
    };

    expect(policyStateReducer(state, action)).toEqual({
      ...initialState.policyState,
      ...inputProps
    });
  });

  it('should call policyStateReducer SET_SUMMARY_LEDGER', () => {
    const state = initialState.policyState;
    const inputProps = {
      billingOptions: {},
      cancelOptions: [],
      effectiveDateReasons: [],
      endorsementHistory: [],
      paymentHistory: [],
      paymentOptions: [],
      policy: {},
      policyID: '',
      summaryLedger: {}
    };
    const action = {
      type: types.SET_SUMMARY_LEDGER,
      policyState: inputProps,
      summaryLedger: {}
    };

    expect(policyStateReducer(state, action)).toEqual({
      ...initialState.policyState,
      ...inputProps
    });
  });

  it('should call policyStateReducer SET_PAYMENT_HISTORY', () => {
    const state = initialState.policyState;
    const inputProps = {
      billingOptions: {},
      cancelOptions: [],
      effectiveDateReasons: [],
      endorsementHistory: [],
      paymentHistory: undefined,
      paymentOptions: [],
      policy: {},
      policyID: '',
      summaryLedger: {}
    };
    const action = {
      type: types.SET_PAYMENT_HISTORY,
      policyState: inputProps
    };

    expect(policyStateReducer(state, action)).toEqual({
      ...initialState.policyState,
      ...inputProps
    });
  });
  it('should call policyStateReducer SET_EFFECTIVE_DATE_CHANGE_REASONS', () => {
    const state = initialState.policyState;
    const inputProps = {
      effectiveDateReasons: [],
      billingOptions: {},
      cancelOptions: [],
      endorsementHistory: [],
      paymentHistory: [],
      paymentOptions: [],
      policy: {},
      policyID: '',
      summaryLedger: {}
    };
    const action = {
      type: types.SET_EFFECTIVE_DATE_CHANGE_REASONS,
      policyState: inputProps,
      effectiveDateReasons: []
    };

    expect(policyStateReducer(state, action)).toEqual({
      ...initialState.policyState,
      ...inputProps
    });
  });

  it('should call policyStateReducer SET_PAYMENT_HISTORY', () => {
    const state = initialState.policyState;
    const inputProps = {
      effectiveDateReasons: [],
      billingOptions: {},
      cancelOptions: [],
      endorsementHistory: [],
      paymentHistory: [],
      paymentOptions: [],
      policy: {},
      policyID: '',
      summaryLedger: {}
    };
    const action = {
      type: types.SET_PAYMENT_HISTORY,
      policyState: inputProps,
      paymentHistory: []
    };

    expect(policyStateReducer(state, action)).toEqual({
      ...initialState.policyState,
      ...inputProps
    });
  });
  it('should call policyStateReducer SET_ENDORSEMENT_HISTORY', () => {
    const state = initialState.policyState;
    const inputProps = {
      effectiveDateReasons: [],
      billingOptions: {},
      cancelOptions: [],
      endorsementHistory: [],
      paymentHistory: [],
      paymentOptions: [],
      policy: {},
      policyID: '',
      summaryLedger: {}
    };
    const action = {
      type: types.SET_ENDORSEMENT_HISTORY,
      policyState: inputProps,
      endorsementHistory: []
    };

    expect(policyStateReducer(state, action)).toEqual({
      ...initialState.policyState,
      ...inputProps
    });
  });

  it('should call policyStateReducer SET_BILLING_OPTIONS', () => {
    const state = initialState.policyState;
    const inputProps = {
      effectiveDateReasons: [],
      billingOptions: {},
      cancelOptions: [],
      endorsementHistory: [],
      paymentHistory: [],
      paymentOptions: [],
      policy: {},
      policyID: '',
      summaryLedger: {}
    };
    const action = {
      type: types.SET_BILLING_OPTIONS,
      policyState: inputProps,
      billingOptions: {}
    };

    expect(policyStateReducer(state, action)).toEqual({
      ...initialState.policyState,
      ...inputProps
    });
  });

  it('should call policyStateReducer SET_CANCEL_OPTIONS', () => {
    const state = initialState.policyState;
    const inputProps = {
      effectiveDateReasons: [],
      billingOptions: {},
      cancelOptions: [],
      endorsementHistory: [],
      paymentHistory: [],
      paymentOptions: [],
      policy: {},
      policyID: '',
      summaryLedger: {}
    };
    const action = {
      type: types.SET_CANCEL_OPTIONS,
      policyState: inputProps,
      cancelOptions: []
    };

    expect(policyStateReducer(state, action)).toEqual({
      ...initialState.policyState,
      ...inputProps
    });
  });

  it('should call policyStateReducer SET_PAYMENT_OPTIONS', () => {
    const state = initialState.policyState;
    const inputProps = {
      effectiveDateReasons: [],
      billingOptions: {},
      cancelOptions: [],
      endorsementHistory: [],
      paymentHistory: [],
      paymentOptions: [],
      policy: {},
      policyID: '',
      summaryLedger: {}
    };
    const action = {
      type: types.SET_PAYMENT_OPTIONS,
      policyState: inputProps,
      paymentOptions: []
    };

    expect(policyStateReducer(state, action)).toEqual({
      ...initialState.policyState,
      ...inputProps
    });
  });
});
