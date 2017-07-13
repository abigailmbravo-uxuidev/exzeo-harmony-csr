import React from 'react';
import { shallow } from 'enzyme';
import { RadioInputBilling } from './RadioFieldBilling';
import FieldHint from './FieldHint';
import RadioOptionBilling from './RadioOptionBilling';

describe('RadioFieldBilling', () => {
  it('should render "radio group"', () => {
    const wrapper = shallow(<RadioInputBilling />);

    expect(wrapper);
  });
  it('should render FieldHint when provided with name and hint', () => {
    const inputProps = {
      paymentPlan: {},
      input: {
        name: 'test'
      },
      hint: 'Testing',
      answers: []
    };
    const wrapper = shallow(<RadioInputBilling {...inputProps} />);

    expect(wrapper.find(FieldHint).length).toEqual(1);
  });
  it('should render DisplayField when provided with displayValue', () => {
    const inputProps = {
      displayValue: '123'
    };
    const wrapper = shallow(<RadioInputBilling {...inputProps} />);

    expect(wrapper.containsMatchingElement(
      <input type="text" value={inputProps.displayValue} readOnly />
    )).toEqual(true);
  });
  it('should render RadioOptionBilling of length 2 when provided with 2 answers', () => {
    const inputProps = {
      paymentPlans: ['Annual', 'Semi-Annual', 'Quarterly'],
      input: {
        onChange: () => {}
      },
      answers: [{
        answer: 'One'
      }, {
        answer: 'Two'
      }, {
        answer: 'Three'
      }]
    };
    const wrapper = shallow(<RadioInputBilling {...inputProps} />);
    expect(wrapper.find(RadioOptionBilling).length).toEqual(3);
  });
});
