import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import PropertyAddressComponent from './PropertyAddress';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing PropertyAddress component', () => {
  it('should test app render', () => {
    const store = mockStore();
    const props = {};
    const wrapper = shallow(<PropertyAddressComponent store={store} {...props} />);
    expect(wrapper);
  });
});
