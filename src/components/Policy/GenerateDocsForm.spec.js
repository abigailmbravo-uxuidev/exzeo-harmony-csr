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
  errorHandler: () => {},
  updateNotes: () => {}
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
    const mock = new MockAdapter(axios);
    const blob = new Blob(['test'], {type: 'application/pdf' });
    mock.onPost(`${process.env.REACT_APP_API_URL}/generate-document`).reply(200, 
      'testing', 
      {'content-disposition': 'attachment; filename=test.pdf'}
    );

    const wrapper = shallow(<FormComponent store={store} {...props} />).dive().dive().dive().instance();
    const data =  { documentType: 'policyInvoice', effectiveDate: null }
    const res = wrapper.generateDoc(data, null, wrapper.props);
    expect(wrapper.state.isSubmitting).toBe(true);
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
