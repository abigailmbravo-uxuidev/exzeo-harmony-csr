import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import ConnectedApp, {
  ReinstatePolicyPopup,
  handleInitialize
} from './ReinstatePolicyPopup';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing ReinstatePolicyPopup component', () => {
  it('should test connected app', () => {
    const initialState = {
      policyState: {},
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
        latestPolicy: {}
      },
      appState: {
        data: {},
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

  it('should test ReinstatePolicyPopup', () => {
    const initialState = {
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
        latestPolicy: {}
      },
      appState: {
        data: {},
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      latestPolicy: {
        policyNumber: '123'
      },
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
    const wrapper = shallow(<ReinstatePolicyPopup store={store} {...props} />);
    expect(wrapper);
    wrapper.find('.btn-primary').simulate('click');
    wrapper.find('.btn-secondary').simulate('click');
  });
});
