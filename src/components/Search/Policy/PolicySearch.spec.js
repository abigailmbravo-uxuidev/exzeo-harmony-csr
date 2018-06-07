import React from 'react';
import { shallow } from 'enzyme';
import PolicySearch from './PolicySearch';

describe('Quote Search', () => {
  it('renders Quote Search', () => {
    const wrapper = shallow(<PolicySearch handlePagination={x => x} search={{ totalPages: 5, results: [{}], currentPage: 1 }} />);
    expect(wrapper);
  });
});

