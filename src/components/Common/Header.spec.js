import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Header from './Header';

const middlewares = [];
const mockStore = configureStore(middlewares);
it('renders without crashing', () => {
  const props = {
    auth: {
      userProfile: {}
    }
  };
  const initialState = {
    appState: {
      data: { showScheduleDateModal: true },
      modelName: 'bb'
    }
  };
  const store = mockStore(initialState);
  const wrapper = shallow(<Header store={store} {...props} />);
  expect(wrapper);
});
