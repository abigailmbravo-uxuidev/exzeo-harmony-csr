import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import { CancelPolicy, handleInitialize, Payments, Claims, handleFormSubmit, resetCancelReasons } from './Cancel';

const middlewares = [];
const mockStore = configureStore(middlewares);

const cancelOptions = [
  {
    cancelType: 'Voluntary Cancellation',
    cancelReason: ['Continuous Wind Coverage - 3 Yrs', 'Duplicate - Similar Coverage', 'Insured Deceased', 'Mortgage Satisfied', 'Other', 'Property Demolished', 'Property Foreclosed', 'Reason Not Provided', 'Rewritten - Similar Coverage', 'Sold']
  },
  {
    cancelType: 'Underwriting Cancellation',
    cancelReason: ['Claims Frequency', 'Claims Severity', 'Condition of Roof', 'Empty Pool', 'Existing/Unrepaired Damage', 'Failure to Comply with Underwriting Request', 'Ineligible Breed of Dog', 'Ineligible Ownership', 'Ineligible Protection Class', 'Ineligible Risk', 'Insured Deceased', 'No Insurable Interest', 'Policy Limits Paid', 'Property in Disrepair', 'Risk Management', 'Slide/Diving Board', 'Tenant Occupied', 'Trampoline', 'Unsecured Pool', 'Vacant']
  },
  {
    cancelType: 'Underwriting Non-Renewal',
    cancelReason: ['Claims Frequency', 'Claims Severity', 'Condition of Roof', 'Empty Pool', 'Existing/Unrepaired Damage', 'Failure to Comply with Underwriting Request', 'Ineligible Breed of Dog', 'Ineligible Ownership', 'Ineligible Protection Class', 'Ineligible Risk', 'Insured Deceased', 'No Insurable Interest', 'Policy Limits Paid', 'Property in Disrepair', 'Risk Management', 'Slide/Diving Board', 'Tenant Occupied', 'Trampoline', 'Unsecured Pool', 'Vacant']
  }
];

describe('Testing Cancel component', () => {
  it('should test connected app', () => {
    const initialState = {
      service: {

      },
      cg: {
        bb: {
          data: {
            modelInstanceId: '123',
            model: {},
            uiQuestions: []
          }
        }
      },
      appState: {
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      zipCodeSettings: { timezone: 'America/New_York' },
      reset() {},
      userProfile: {},
      actions: {
        cgActions: {
          batchCompleteTask() { return Promise.resolve(); },
          startWorkflow() { return Promise.resolve({ payload: [{ workflowData: { cancelPolicyModelUI: { data: {} }, cancelPolicy: { data: {} } } }] }); }
        },
        appStateActions: {
          setAppState() {}
        },
        policyStateActions: {
          updatePolicy() {}
        },
        serviceActions: {
          getBillingOptionsForPolicy() { return Promise.resolve(); },
          getBillingOptions() { return Promise.resolve(); },
          getSummaryLedger() { return Promise.resolve(); }
        }
      },
      policy: {

      },
      fieldValues: {
        cancelType: 'Underwriting Cancellation'
      },
      summaryLedger: { status: { code: 0 } },
      handleSubmit() {},
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        }
      }
    };
    const wrapper = shallow(<CancelPolicy label="test" store={store} {...props} />);
    expect(wrapper);

    wrapper.instance().componentWillReceiveProps({
      dispatch: store.dispatch,
      fieldValues: {
        cancelType: 'Underwriting Cancellation'
      },
      zipCodeSettings: { timezone: 'America/New_York' },
      summaryLedger: {},
      actions: {
        policyStateActions: {
          updatePolicy() {}
        },
        serviceActions: {
          getCancelOptions() {},
          getBillingOptionsForPolicy() { return Promise.resolve(); },
          getPaymentHistory() { return Promise.resolve(); },
          getBillingOptions() { return Promise.resolve(); },
          getSummaryLedger() { return Promise.resolve(); },
          getZipcodeSettings() { }
        }
      },
      policy: { property: { physicalAddress: { zip: 33607 } }, policyNumber: '1234', rating: { worksheet: { fees: {} } } }
    });

    handleInitialize(initialState);

    Payments({});
    Claims({});
    handleFormSubmit({}, props.dispatch, props);
    resetCancelReasons(props);
  });
});
