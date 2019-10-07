import React from 'react';
import { shallow } from 'enzyme';

import PolicySearch from './PolicySearch';

describe('Test PolicySearch component', () => {
  const baseProps = {
    handlePagination: jest.fn(),
    reset: jest.fn(),
    search: { results: [], totalPages: 0, currentPage: 1 },
    submitting: false
  };

  it('renders Policy Search', () => {
    const wrapper = shallow(<PolicySearch {...baseProps} />);
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('div.advanced-search')).toHaveLength(0);
  });
});
