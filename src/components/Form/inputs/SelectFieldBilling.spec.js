import React from 'react';
import { shallow } from 'enzyme';
import { SelectFieldBilling } from './SelectFieldBilling';

function wrapWithContext(context, contextTypes, children) {
  const wrapperWithContext = React.createClass({ //eslint-disable-line
    childContextTypes: contextTypes,
    getChildContext() { return context; },
    render() { return React.createElement('div', null, children); }
  });

  return React.createElement(wrapperWithContext);
}
describe('SelectFieldBilling', () => {
  it('should render "select input" when nothing is provided', () => {
    const context = { router: {} };
    const contextTypes = { router: React.PropTypes.object };
    const wrapper = wrapWithContext(context, contextTypes, <SelectFieldBilling />, React);
    expect(shallow(wrapper).find('option').length).toEqual(0);
  });

  it('should render "select input" with answers when answers are provided', () => {
    const inputProps = {
      answers: [{
        answer: 'One'
      }, {
        answer: 'Two'
      }, {
        answer: 'Three'
      }]
    };
    const context = { router: {} };
    const contextTypes = { router: React.PropTypes.object };
    const wrapper = wrapWithContext(context, contextTypes, <SelectFieldBilling {...inputProps} />, React);
    expect(shallow(wrapper).children().props().answers.length).toEqual(3);
    // Need to take into account blank option
  });

  // TODO: Check renders
  // TODO: Check classnames
  // TODO: Check props
  // TODO: Check event handlers
});
