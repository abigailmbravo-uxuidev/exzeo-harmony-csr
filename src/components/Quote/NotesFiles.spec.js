import React from 'react';
import { shallow } from 'enzyme';

import { NotesFiles } from './NotesFiles';

describe('Test the NotesFiles Component', () => {
  const props = {
    match: {
      params: { quoteNumber: 'test'}
    },
    quoteData: {},
    getQuote: jest.fn()
  }
  it('Should Render NotesFiles', () => {
    const wrapper = shallow(<NotesFiles {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});