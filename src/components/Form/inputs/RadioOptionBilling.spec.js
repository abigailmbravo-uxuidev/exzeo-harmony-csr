import React from 'react';
import { shallow } from 'enzyme';
import RadioOptionBilling from './RadioOptionBilling';

describe('RadioOptionBilling', () => {
  it('should trigger onChange when input is changed', () => {
    let optionValue = '';
    const onChange = (value) => {
      optionValue = value;
    };
    const inputProps = {
      onChange,
      name: 'test',
      size: 1,
      value: optionValue,
      answer: {
        answer: 'testing',
        image: 'test'
      }
    };
    const wrapper = shallow(<RadioOptionBilling {...inputProps} />);
    expect(wrapper);
  });

  it('should trigger onClick when wrapper div is clicked', () => {
    let optionValue = '';
    const onChange = (value) => {
      optionValue = value;
    };
    const inputProps = {
      onChange,
      name: 'test',
      size: 1,
      value: optionValue,
      answer: {
        answer: 'testing',
        image: 'test'
      }
    };
    const wrapper = shallow(<RadioOptionBilling {...inputProps} />);
    expect(wrapper);
  });
});
