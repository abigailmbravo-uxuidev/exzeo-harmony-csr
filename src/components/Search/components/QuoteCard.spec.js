import React from 'react';
import { shallow } from 'enzyme';
import QuoteCard from './QuoteCard';
import quoteTestData from '../../Common/quoteTestData';

it('renders without crashing', () => {
  const wrapper = shallow(<QuoteCard
    policyKeyEnter={() => function () {}}
    quote={quoteTestData}
    index={1}
    quoteSelection={() => function () {}}
  />);
  expect(wrapper);
});
