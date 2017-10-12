import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import ConnectedApp, { CancelPolicy, handleGetPolicy, handleInitialize, Payments, Claims, handleFormSubmit, resetCancelReasons } from './Cancel';

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
      actions: {
        serviceActions: {
          getBillingOptions() { return Promise.resolve(); },
          getSummaryLedger() { return Promise.resolve(); }
        }
      },
      policy: {

      },
      fieldValues: {

      },
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
    const wrapper = shallow(<CancelPolicy store={store} {...props} />);
    expect(wrapper);

    wrapper.instance().componentWillReceiveProps({ actions: {
      serviceActions: {
        getPaymentHistory() { return Promise.resolve(); },
        getBillingOptions() { return Promise.resolve(); },
        getSummaryLedger() { return Promise.resolve(); }
      }
    },
      policy: { policyNumber: '1234', rating: { worksheet: { fees: {} } } } });

    handleGetPolicy(initialState);
    handleInitialize(initialState);

    Payments({});
    Claims({});
    handleFormSubmit({}, props.dispatch, props);
    resetCancelReasons(props);
  });
});