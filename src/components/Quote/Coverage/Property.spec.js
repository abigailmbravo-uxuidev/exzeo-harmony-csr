import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import PropertyComponent from './Property';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing Property component', () => {
  it('should test app render', () => {
    const store = mockStore();
    const props = {};
    const wrapper = shallow(<PropertyComponent store={store} {...props} />);
    expect(wrapper);
  });
});
