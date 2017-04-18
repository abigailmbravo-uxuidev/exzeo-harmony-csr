import React from 'react';
import { shallow } from 'enzyme';
import { SliderInput } from './SliderField';
import FieldHint from './FieldHint';

describe('SliderInput', () => {
  it('should render "slider input" when given no props', () => {
    const wrapper = shallow(<SliderInput />);

    expect(wrapper.containsAnyMatchingElements([
      <input type="text" />,
      <input type="range" />
    ])).toEqual(true);
  });

  it('should render FieldHint when provided with a hint', () => {
    const inputProps = {
      hint: 'Testing',
      input: {
        name: 'test'
      }
    };
    const wrapper = shallow(<SliderInput {...inputProps} />);

    expect(wrapper.find(FieldHint).length).toEqual(1);
  });

  // TODO: Test min, max, and all other props with on change
});
