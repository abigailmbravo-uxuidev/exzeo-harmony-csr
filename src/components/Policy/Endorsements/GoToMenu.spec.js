import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import GoToMenuComponent from './GoToMenu';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing GoToMenu component', () => {
  it('should test app render', () => {
    const store = mockStore();
    const props = {};
    const wrapper = shallow(<GoToMenuComponent store={store} {...props} />);

    wrapper.find('button#coverage-scroll').simulate('click');
    wrapper.find('button#home-scroll').simulate('click');
    wrapper.find('button#policy-scroll').simulate('click');
    wrapper.find('button#addresses-scroll').simulate('click');
  });
});
