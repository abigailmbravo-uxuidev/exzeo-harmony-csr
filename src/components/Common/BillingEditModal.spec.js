import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import ConnectedApp, { BillingEditModal, selectBillPlan, selectBillTo, handleInitialize } from './BillingEditModal';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing BillingEditModal component', () => {
  it('should test connected app', () => {
    const initialState = {
      authState: {
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
      service: {
        latestPolicy: {},
        billingOptions: { options: [{ billToId: '23432432432432432', billToType: 'Annual' }] }
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
      }
    };
    const store = mockStore(initialState);
    const props = {
      handleSubmit: fn => fn,
      handleBillingFormSubmit: fn => fn,
      billingOptions: initialState.service.billingOptions,
      fieldValues: {},
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        }
      }
    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper.instance().props.fieldValues).toEqual({});
    selectBillPlan('Annual', props);
    selectBillTo({ target: { value: '' } }, props);
    handleInitialize(initialState);
    BillingEditModal(props);
  });
});
