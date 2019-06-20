import React from 'react';
import { shallow } from 'enzyme';
import QuoteCard from './QuoteCard';
import quoteTestData from '../../../components/Common/quoteTestData';

it('renders without crashing', () => {
  const wrapper = shallow(
    <QuoteCard
      policyKeyEnter={x => x}
      quote={quoteTestData}
      index={1}
      quoteSelection={x => x}
    />
  );
  expect(wrapper);
});
