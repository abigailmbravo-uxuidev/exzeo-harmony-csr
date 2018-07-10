import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import ProducedByComponent from './ProducedBy';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing ProducedBy component', () => {
  it('should test app render', () => {
    const store = mockStore();
    const props = {};
    const wrapper = shallow(<ProducedByComponent store={store} {...props} />);

    wrapper.find('[name="effectiveDate"]').simulate('change', { target: { value: '2017-05-04' } });
    wrapper.find('[name="agencyCode"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="agentCode"]').simulate('change', { target: { value: 'ABC' } });
  });
});
