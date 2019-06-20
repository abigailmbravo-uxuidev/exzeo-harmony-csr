import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import { CancelPolicy, handleInitialize, handleFormSubmit } from './Cancel';

const mockStore = configureStore([]);

const cancelOptions = [
  {
    cancelType: 'Voluntary Cancellation',
    cancelReason: [
      'Continuous Wind Coverage - 3 Yrs',
      'Duplicate - Similar Coverage',
      'Insured Deceased',
      'Mortgage Satisfied',
      'Other',
      'Property Demolished',
      'Property Foreclosed',
      'Reason Not Provided',
      'Rewritten - Similar Coverage',
      'Sold'
    ]
  },
  {
    cancelType: 'Underwriting Cancellation',
    cancelReason: [
      'Claims Frequency',
      'Claims Severity',
      'Condition of Roof',
      'Empty Pool',
      'Existing/Unrepaired Damage',
      'Failure to Comply with Underwriting Request',
      'Ineligible Breed of Dog',
      'Ineligible Ownership',
      'Ineligible Protection Class',
      'Ineligible Risk',
      'Insured Deceased',
      'No Insurable Interest',
      'Policy Limits Paid',
      'Property in Disrepair',
      'Risk Management',
      'Slide/Diving Board',
      'Tenant Occupied',
      'Trampoline',
      'Unsecured Pool',
      'Vacant'
    ]
  },
  {
    cancelType: 'Underwriting Non-Renewal',
    cancelReason: [
      'Claims Frequency',
      'Claims Severity',
      'Condition of Roof',
      'Empty Pool',
      'Existing/Unrepaired Damage',
      'Failure to Comply with Underwriting Request',
      'Ineligible Breed of Dog',
      'Ineligible Ownership',
      'Ineligible Protection Class',
      'Ineligible Risk',
      'Insured Deceased',
      'No Insurable Interest',
      'Policy Limits Paid',
      'Property in Disrepair',
      'Risk Management',
      'Slide/Diving Board',
      'Tenant Occupied',
      'Trampoline',
      'Unsecured Pool',
      'Vacant'
    ]
  }
];

describe('Testing Cancel component', () => {
  it('should test connected app', () => {
    const initialState = {
      zipCodeSettings: { timezone: 'America/New_York' },
      service: {
        cancelOptions
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
        modelName: 'bb',
        data: {
          submitting: false
        }
      },
      policyState: {
        billingOptions: {},
        policy: {},
        summaryLedger: { status: { code: 0 } }
      }
    };
    const store = mockStore(initialState);
    const props = {
      batchCompleteTask() {
        return Promise.resolve();
      },
      startWorkflow() {
        return Promise.resolve({
          payload: [
            {
              workflowData: {
                cancelPolicyModelUI: { data: {} },
                cancelPolicy: { data: {} }
              }
            }
          ]
        });
      },
      setAppState() {},
      getPolicy() {},
      getCancelOptions() {
        return Promise.resolve();
      },
      getBillingOptionsForPolicy() {
        return Promise.resolve();
      },
      getPaymentHistory() {},
      getZipcodeSettings() {},
      reset() {},
      handleSubmit() {},
      fieldValues: { cancelType: 'Underwriting Cancellation' },
      userProfile: {},
      fieldQuestions: [],
      quoteData: {},
      policy: initialState.policyState.policy,
      summaryLedger: initialState.policyState.summaryLedger,
      zipCodeSettings: { timezone: 'America/New_York' },
      appState: initialState.appState,
      dispatch: store.dispatch,
      cancelOptions,
      paymentOptions: []
    };
    const wrapper = shallow(<CancelPolicy label="test" {...props} />);
    expect(wrapper);

    wrapper.instance().componentWillReceiveProps({
      ...props,
      fieldValues: { cancelType: 'Voluntary Cancellation' },
      summaryLedger: {},
      policy: {
        property: { physicalAddress: { zip: 33607 } },
        policyNumber: '1234',
        rating: { worksheet: { fees: {} } }
      }
    });

    wrapper.instance().componentWillReceiveProps({
      ...props,
      fieldValues: { cancelType: 'Underwriting Non-Renewal' },
      summaryLedger: {},
      policy: {
        property: { physicalAddress: { zip: 33607 } },
        policyNumber: '1234',
        rating: { worksheet: { fees: {} } }
      }
    });

    wrapper.instance().resetCancelReasons();

    handleInitialize(initialState);
    handleFormSubmit({}, props.dispatch, props);
  });
});
