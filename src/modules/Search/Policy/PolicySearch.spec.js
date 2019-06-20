import React from 'react';
import { shallow } from 'enzyme';

import PolicySearch from './PolicySearch';

describe('Test PolicySearch component', () => {
  const baseProps = {
    handlePagination: x => x,
    toggleAdvancedSearch: x => x,
    advancedSearch: false,
    search: { results: [], totalPages: 0, currentPage: 1 },
    submitting: false
  };

  it('renders Policy Search', () => {
    const wrapper = shallow(<PolicySearch {...baseProps} />);
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('div.advanced-search')).toHaveLength(0);
  });

  it('renders an advanced search section when passed advancedSearch prop', () => {
    const wrapper = shallow(<PolicySearch {...baseProps} advancedSearch />);
    expect(wrapper.find('div.advanced-search')).toHaveLength(1);
  });
});
