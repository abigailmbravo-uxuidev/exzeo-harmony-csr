import React from 'react';
import { shallow, mount } from 'enzyme';

import DiariesSearch from './DiariesSearch';

describe('Test DiariesSearch component', () => {
  const baseProps = {
    search: { results: [], totalPages: 0, currentPage: 1 },
    submitting: false,
    assigneeAnswers: [],
    initialize: x => x,
    userProfile: { userId: '1234' }
  };

  it('renders Diaries Search', () => {
    const wrapper = shallow(<DiariesSearch {...baseProps} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
