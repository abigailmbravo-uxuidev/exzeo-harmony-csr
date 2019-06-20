import React from 'react';
import { shallow } from 'enzyme';
import NumberFormat from 'react-number-format';
import { NumberInput } from './NumberField';

describe('NumberInput', () => {
  it('should render "text input" with FieldHint, when name, label, and hint are provided', () => {
    const inputProps = {
      label: 'Test',
      input: {
        name: 'testing'
      },
      hint: 'Test Hint'
    };
    const wrapper = shallow(<NumberInput {...inputProps} />);
    expect(
      wrapper
        .find(NumberFormat)
        .first()
        .props().disabled
    ).toEqual(undefined);
  });

  it('should render "disabled text input", when disabled is provided', () => {
    const inputProps = {
      disabled: true
    };
    const wrapper = shallow(<NumberInput {...inputProps} />);
    expect(
      wrapper
        .find(NumberFormat)
        .first()
        .props().disabled
    ).toEqual(true);
  });
});
