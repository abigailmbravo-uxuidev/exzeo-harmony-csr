import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { mount } from 'enzyme';

import ConnectedApp from './DetailHeader';

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
      agency: { agencyCode: 'TTIC' },
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        }
      },
      ...propTypes
    };
    const wrapper = mount(<ConnectedApp store={store} {...props} />);

    expect(wrapper);
  });
});
