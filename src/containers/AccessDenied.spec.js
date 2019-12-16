import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import ConnectedApp from './AccessDenied';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing AccessDenied component', () => {
  it('should test connected app', () => {
    const initialState = {
      appState: {
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      auth: {
        logout() {}
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
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);
    wrapper.find('button').simulate('click');
  });
});
