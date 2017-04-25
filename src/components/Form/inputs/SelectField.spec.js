import React from 'react';
import { shallow } from 'enzyme';
import { SelectField } from './SelectField';
import FieldHint from './FieldHint';

describe('SelectField', () => {
  it('should render "select input" when nothing is provided', () => {
    const wrapper = shallow(<SelectField />);
    expect(wrapper);
    expect(wrapper.find('option').length).toEqual(0);
  });

  it('should render FieldHint when provided with name and hint', () => {
    const inputProps = {
      input: {
        name: 'test'
      },
      hint: 'testing'
    };
    const wrapper = shallow(<SelectField {...inputProps} />);
    expect(wrapper.find(FieldHint).length).toEqual(1);
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
    const wrapper = shallow(<SelectField {...inputProps} />);

    expect(wrapper);
    // Need to take into account blank option
    expect(wrapper.find('option').length).toEqual((4));
  });

  // TODO: Check renders
  // TODO: Check classnames
  // TODO: Check props
  // TODO: Check event handlers
});
