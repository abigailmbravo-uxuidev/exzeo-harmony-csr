import React from 'react';
import { shallow } from 'enzyme';
import { QuoteLanding } from './QuoteLanding';

describe('Testing QuoteLanding component', () => {
  it('should render given minimal props', () => {
    const props = {
      appState: { data: {}, modelName: 'csr', modelInstanceId: '123' },
      cgState: {},
      quoteData: {},
      match: { params: {} },
      batchCompleteTask: () => Promise.resolve({}),
      startWorkflow: () => Promise.resolve({}),
      setAppState: () => {},
      setAppError: () => {}
    };

    const component = shallow(<QuoteLanding {...props} />);
    expect(component);
    component.instance().componentDidMount();
  });

  it('should setup steps for batchCompleteTask based on \'newQuote\' prop value', () => {
    const props = {
      appState: { data: {}, modelName: 'csr', modelInstanceId: '123' },
      cgState: {},
      quoteData: { _id: '321' },
      match: { params: {} },
      newQuote: true,
      batchCompleteTask: () => Promise.resolve({}),
      startWorkflow: () => Promise.resolve({}),
      setAppState: () => {},
      setAppError: () => {}
    };

    const component = shallow(<QuoteLanding {...props} />);
    expect(component);
    component.instance().componentDidMount();
  });
});
