import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import { BillingEditModal, handleInitialize } from './BillingEditModal';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing BillingEditModal component', () => {
  it('should test connected app', () => {
    const initialState = {
      policyState: { billingOptions: [], policy: {} },
      authState: {},
      cg: {
        bb: {
          data: {
            modelInstanceId: '123',
            model: {},
            uiQuestions: []
          }
        }
      },
      service: {
        latestPolicy: {},
        billingOptions: {
          options: [{ billToId: '23432432432432430', billToType: 'Annual' }],
          paymentPlans: {
            annual: {},
            semiAnnual: {},
            quaterly: {}
          }
        }
      },
      appState: {
        data: {
          selectedAI: {
            type: 'Mortgagee',
            phoneNumber: '43543543535',
            mailingAddress: {}
          },
          showAdditionalInterestModal: false
        },
        modelName: 'bb'
      },
      form: {}
    };
    const store = mockStore(initialState);
    const props = {
      handleSubmit: fn => fn,
      handleBillingFormSubmit: fn => fn,
      billingOptions: initialState.service.billingOptions.options,
      billToId: '23432432432432430',
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        }
      },
      policy: {}
    };

    const wrapper = shallow(<BillingEditModal store={store} {...props} />);
    expect(wrapper.instance().props.billToId).toEqual('23432432432432430');
    handleInitialize(initialState);
  });
});
