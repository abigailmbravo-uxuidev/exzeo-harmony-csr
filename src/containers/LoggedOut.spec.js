import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import ConnectedApp from './LoggedOut';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing LoggedOut component', () => {
  it('should test connected app', () => {
    const initialState = {
      appState: {
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      auth: {
        login() {}
      },
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        }
      }
    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);
    wrapper.find('button').simulate('click');
  });
});
