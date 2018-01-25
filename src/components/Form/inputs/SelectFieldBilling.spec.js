import React from 'react';
import { mount, shallow } from 'enzyme';
import SelectFieldBilling from './SelectFieldBilling';

describe('SelectFieldBilling', () => {
  it('should render "select input" when nothing is provided', () => {
    const inputProps = {
      name: 'test',
      label: 'test'
    };
    const wrapper = shallow(<SelectFieldBilling {...inputProps} />);
    expect(wrapper.find('option').length).toEqual(0);
  });

  it('should render "select input" with answers when answers are provided', () => {
    const inputProps = {
      name: 'test',
      label: 'test',
      answers: [{
        answer: 'One'
      }, {
        answer: 'Two'
      }, {
        answer: 'Three'
      }]
    };

    const wrapper = shallow(<SelectFieldBilling {...inputProps} />);
    expect(wrapper.prop('answers').length).toEqual(3);
    // Need to take into account blank option
  });

  // TODO: Check renders
  // TODO: Check classnames
  // TODO: Check props
  // TODO: Check event handlers
});
