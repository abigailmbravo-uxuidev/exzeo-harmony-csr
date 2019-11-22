import React from 'react';
import PropTypes from 'prop-types';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import Login from './Login';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing Login component', () => {
  it('should try to login', () => {
    const initialState = {
      appState: {
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      auth: {
        login() {},
        isAuthenticated() {}
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
    const wrapper = shallow(<Login store={store} {...props} />);
    expect(wrapper);
    wrapper.instance().componentDidMount();
  });
});
