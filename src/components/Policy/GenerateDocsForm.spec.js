import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment-timezone';

import GenerateDocsForm from './GenerateDocsForm';

describe('Testing GenerateDocsForm component', () => {
  it('Should Render', () => {
    const props = {
      policyNumber: '123',
      policyID: '12345',
      errorHandler: jest.fn(),
      handleSubmit: jest.fn(),
      startWorkflow: jest.fn(() => Promise.resolve({})),
      updateNotes: jest.fn()
    };

    const wrapper = mount(<GenerateDocsForm { ...props } />);
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('form')).toHaveLength(1);
  });
});
