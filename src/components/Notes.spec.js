import React from 'react';
import { shallow } from 'enzyme';

import { Notes } from './Notes';

describe('Test the Notes Component', () => {
  it('Should Render Notes', () => {
    const props = { 
      numbers: ['test']},
      numberType: 'policyNumber',
      setAppError: jest.fn() 
    };
    const wrapper = shallow(<Notes {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('Should Render NoteList', () => {
    const props = { 
      numbers: ['test']},
      numberType: 'policyNumber',
      setAppError: jest.fn() 
    };
    const wrapper = shallow(<Notes {...props} />);
    expect(wrapper.find('NoteList')).toHaveLength(1);
  });
});