import React from 'react';
import { mount } from 'enzyme';
import { QuoteLanding } from './QuoteLanding';

describe('Testing QuoteLanding component', () => {
  it('should render given minimal props', () => {
    const props = {
      quoteData: {},
      match: { params: {} },
      createQuote: () => {},
      setAppError: () => {},
    };

    const component = mount(<QuoteLanding {...props} />);
    expect(component);
  });

  it('should setup steps for batchCompleteTask based on \'newQuote\' prop value', () => {
    const props = {
      quoteData: { _id: '321' },
      match: { params: {} },
      createQuote: () => {},
      setAppError: () => {},
    };

    const component = mount(<QuoteLanding {...props} />);
    expect(component);
  });
});
