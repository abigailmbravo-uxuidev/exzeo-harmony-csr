import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import WindMitigationComponent from './WindMitigation';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing WindMitigation component', () => {
  it('should test app render', () => {
    const store = mockStore();
    const props = {};
    const wrapper = shallow(<WindMitigationComponent store={store} {...props} />);
    expect(wrapper);
  });
});
