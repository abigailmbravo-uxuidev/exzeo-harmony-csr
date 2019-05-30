import React from 'react';
import { mount } from 'enzyme';

import { Notes } from './Notes';

describe('Test the Notes Component', () => {
  it('Should Render Notes', () => {
    const props = {
      policy: {},
      numbers: ['test'],
      numberType: 'policyNumber',
      setAppError: jest.fn()
    };
    const wrapper = mount(<Notes {...props} />);

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('NoteList')).toHaveLength(1);
  });
});
