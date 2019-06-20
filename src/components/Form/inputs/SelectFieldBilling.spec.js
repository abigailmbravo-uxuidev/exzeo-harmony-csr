import React from 'react';
import { shallow } from 'enzyme';
import SelectFieldBill, { SelectFieldBilling } from './SelectFieldBilling';

describe('SelectFieldBilling', () => {
  it('should render "select input" when nothing is provided', () => {
    const inputProps = {
      name: 'test',
      label: 'test'
    };
    const wrapper = shallow(<SelectFieldBill {...inputProps} />);
    expect(wrapper.find('option').length).toEqual(0);
  });

  it('should render "select input" with answers when answers are provided', () => {
    const inputProps = {
      name: 'test',
      label: 'test',
      answers: [
        {
          answer: 'One'
        },
        {
          answer: 'Two'
        },
        {
          answer: 'Three'
        }
      ]
    };

    const wrapper = shallow(<SelectFieldBill {...inputProps} />);
    expect(wrapper.prop('answers').length).toEqual(3);
    // Need to take into account blank option
  });

  it('should render "select input" with answers when answers are provided', () => {
    const inputProps = {
      meta: {},
      name: 'test',
      label: 'test',
      answers: [
        {
          answer: 'One'
        },
        {
          answer: 'Two'
        },
        {
          answer: 'Three'
        }
      ]
    };

    const wrapper = shallow(<SelectFieldBilling {...inputProps} />);
    expect(wrapper);
  });
});
