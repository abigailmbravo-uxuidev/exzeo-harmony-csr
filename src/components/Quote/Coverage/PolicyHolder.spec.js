import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import PolicyHolderComponent from './PolicyHolder';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing PolicyHolder component', () => {
  it('should test app render', () => {
    const store = mockStore();
    const props = {};
    const wrapper = shallow(<PolicyHolderComponent store={store} {...props} />);

    wrapper.find('[name="pH1FirstName"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="pH1LastName"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="pH1phone"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="pH1email"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="pH2FirstName"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="pH2LastName"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="pH2phone"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="pH2phone2"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="pH2email"]').simulate('change', { target: { value: 'ABC' } });
  });
});
