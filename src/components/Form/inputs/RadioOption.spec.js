import React from 'react';
import { shallow } from 'enzyme';
import RadioOption from './RadioOption';

describe('RadioOption', () => {
  it('should trigger onChange when input is changed', () => {
    let optionValue = '';
    const onChange = value => {
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
    const wrapper = shallow(<RadioOption {...inputProps} />);
    wrapper.find('input').simulate('change');
    expect(optionValue).toEqual(`${inputProps.answer.answer}`);
    expect(wrapper.find('input').props().value).toEqual(
      `${inputProps.answer.answer}`
    );
  });

  it('should trigger onClick when wrapper div is clicked', () => {
    let optionValue = '';
    const onChange = value => {
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
    const wrapper = shallow(<RadioOption {...inputProps} />);
    wrapper.find(`.radio-column-${inputProps.size}`).simulate('click');
    expect(optionValue).toEqual(`${inputProps.answer.answer}`);
    expect(wrapper.find('input').props().value).toEqual(
      `${inputProps.answer.answer}`
    );
  });
});
