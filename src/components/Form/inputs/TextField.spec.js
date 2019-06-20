import React from 'react';
import { shallow } from 'enzyme';
import { TextInput } from './TextField';
import FieldHint from './FieldHint';

describe('TextInput', () => {
  it('should render "text input" with label, when label and name are provided', () => {
    const inputProps = {
      label: 'Test',
      input: {
        name: 'testing'
      }
    };
    const wrapper = shallow(<TextInput name="Test" {...inputProps} />);

    expect(
      wrapper.containsAnyMatchingElements([
        <input type="text" name={inputProps.input.name} />,
        <label htmlFor={inputProps.input.name}>{inputProps.label}</label>
      ])
    ).toEqual(true);
  });

  it('should render "text input" with FieldHint, when name, label, and hint are provided', () => {
    const inputProps = {
      label: 'Test',
      input: {
        name: 'testing'
      },
      hint: 'Test Hint'
    };
    const wrapper = shallow(<TextInput name="Test" {...inputProps} />);

    expect(wrapper.find(FieldHint).length).toEqual(1);
    expect(
      wrapper.containsAnyMatchingElements([
        <input type="text" name={inputProps.input.name} />,
        <label htmlFor={inputProps.input.name}>{inputProps.label}</label>
      ])
    ).toEqual(true);
  });

  const types = ['text', 'number', 'date'];

  types.forEach(type => {
    it(`should render '${type} input', when given type of ${type} is provided`, () => {
      const inputProps = {
        type
      };
      const wrapper = shallow(<TextInput name="Test" {...inputProps} />);
      expect(wrapper.find('input').prop('type')).toEqual(type);
    });
  });

  it('should render "disabled text input", when disabled is provided', () => {
    const inputProps = {
      input: {
        disabled: true
      }
    };
    const wrapper = shallow(<TextInput name="Test" {...inputProps} />);
    expect(wrapper.find('input').prop('disabled')).toEqual(true);
  });

  it('should render "text input" with error, when touched and error are provided', () => {
    const inputProps = {
      meta: {
        touched: true,
        error: 'Error'
      }
    };
    const wrapper = shallow(<TextInput name="Test" {...inputProps} />);

    expect(
      wrapper.containsAnyMatchingElements([
        <input type="text" />,
        <span>{inputProps.meta.error}</span>
      ])
    ).toEqual(true);
  });

  it('should render "text input" with error, when touched and warning are provided', () => {
    const inputProps = {
      meta: {
        touched: true,
        warning: 'Error'
      }
    };
    const wrapper = shallow(<TextInput name="Test" {...inputProps} />);

    expect(
      wrapper.containsAnyMatchingElements([
        <input type="text" />,
        <span>{inputProps.meta.warning}</span>
      ])
    ).toEqual(true);
  });

  it('should render "text input" without FieldHint, when name and hint are provided', () => {
    const inputProps = {
      input: {
        name: 'testing',
        hint: 'Test Hint'
      }
    };
    const wrapper = shallow(<TextInput name="Test" {...inputProps} />);
    expect(wrapper.find(FieldHint).length).toEqual(0);
  });

  // TODO: Check renders
  // TODO: Check classnames
  // TODO: Check props
  // TODO: Check event handlers
});
