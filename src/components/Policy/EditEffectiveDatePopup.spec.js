import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import ConnectedApp, { EditEffectiveDatePopup, handleInitialize } from './EditEffectiveDatePopup';

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
        effectiveDateReasons: {},
        latestPolicy: {}
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
      handleSubmit() {},
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
    handleInitialize(initialState);
  });
});