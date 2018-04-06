import React from 'react';
import { shallow } from 'enzyme';
import QuoteSearchCard from './QuoteSearchCard';
import quoteTestData from '../Common/quoteTestData';

it('renders without crashing', () => {
  const wrapper = shallow(<QuoteSearchCard
    policyKeyEnter={() => function () {}}
    quote={quoteTestData}
    index={1}
    quoteSelection={() => function () {}}
  />);
  expect(wrapper);
});
