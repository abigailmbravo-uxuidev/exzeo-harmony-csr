import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import ConnectedApp, { DetailHeader } from './DetailHeader';
import { getLatestPolicy } from '../../actions/serviceActions';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing DetailHeader component', () => {
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
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        }
      },
      ...propTypes
    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);
  });

  it('should test DetailHeader', () => {
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
        policyStateActions: {
          updatePolicy() {}
        },
        serviceActions: {
          getEffectiveDateChangeReasons() {},
          getLatestPolicy() {},
        }
      },
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        }
      },
      ...propTypes
    };
    const wrapper = shallow(<DetailHeader store={store} {...props} />);
    expect(wrapper);
    wrapper.instance().componentDidMount();
    wrapper.instance().componentWillReceiveProps({ policyState: { update: true, policyNumber: '123'} , ...props });

  });
});
