import React from 'react';
import { shallow } from 'enzyme';

import { Notes } from './Notes';

describe('Test the Notes Component', () => {
  it('Should Render Notes', () => {
    const wrapper = shallow(<Notes numbers={['test']} numberType="policyNumber" />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('Should Render NoteList', () => {
    const wrapper = shallow(<Notes numbers={['test']} numberType="policyNumber" />);
    expect(wrapper.find('NoteList')).toHaveLength(1);
  });
});