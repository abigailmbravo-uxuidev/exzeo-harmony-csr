import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import FormComponent, { GenerateDocsForm }  from './GenerateDocsForm';

const middlewares = [];
const mockStore = configureStore(middlewares);
const initialState = {
  service: {
    latestPolicy: {}
  }
};
const store = mockStore(initialState);
const props = {
  policyNumber: '123',
  errorHandler: jest.fn(),
  startWorkflow: jest.fn(),
  updateNotes: () => jest.fn()
};

describe('Testing GenerateDocsForm component', () => {
  it('should test app', () => {
    const wrapper = shallow(<FormComponent  store={store} {...props} />);
    const inst = wrapper.dive().dive().dive().instance();
    expect(inst).toBeInstanceOf(GenerateDocsForm);
  });

  it('should toggle date', () => {
    const wrapper = shallow(<FormComponent store={store} {...props} />).dive().dive().dive().instance();
    wrapper.toggleDate({}, 'test');
    expect(wrapper.state.showDate).toBe(false);
  });

  it('should test generateDoc', () => {
    

    const wrapper = shallow(<FormComponent store={store} {...props} />).dive().dive().dive().instance();
    const data =  { documentType: 'policyInvoice', effectiveDate: null }
    const res = wrapper.generateDoc(data, null, wrapper.props);

  });

  it('updateNotes should exist', () => {
    const wrapper = shallow(<FormComponent store={store} {...props} />).dive().dive().dive().instance();
    expect(wrapper.props.updateNotes());
  });

  it('errorHandler should exist', () => {
    const wrapper = shallow(<FormComponent store={store} {...props} />).dive().dive().dive().instance();
    expect(wrapper.props.errorHandler());
  });
});
