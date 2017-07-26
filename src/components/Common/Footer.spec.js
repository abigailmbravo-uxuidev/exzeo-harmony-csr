import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Footer from './Footer';

const middlewares = [];
const mockStore = configureStore(middlewares);
it('renders without crashing', () => {
  const props = {
    auth: {
      userProfile: {}
    }
  };
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
      data: { showScheduleDateModal: true },
      modelName: 'bb'
    }
  };
  const store = mockStore(initialState);
  const wrapper = shallow(<Footer store={store} {...props} />);
  expect(wrapper);
});
