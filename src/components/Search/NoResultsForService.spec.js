import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import ConnectedApp, { NoResults } from './NoResultsForService';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing NoResults component', () => {
  it('should test props and render', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const props = {
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        },
        modelName: 'bb'
      },
      tasks: {
        bb: {
          data: {
            modelInstanceId: '123',
            model: {},
            uiQuestions: [],
            activeTask: {}
          }
        }
      },
      ...propTypes
    };
    const wrapper = shallow(<NoResults {...props} />);
    expect(wrapper);
  });

  it('should test connected app', () => {
    const initialState = {
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
});