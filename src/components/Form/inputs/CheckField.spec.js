import React from 'react';
import { shallow } from 'enzyme';
import { CheckInput } from './CheckField';
import FieldHint from './FieldHint';

describe('CheckInput', () => {
  it('should render "checkbox input" when nothing is provided, with default props', () => {
    const wrapper = shallow(<CheckInput />);

    expect(wrapper.instance().props.input.value).toEqual(false);
    expect(wrapper.instance().props.input.onChange);
    expect(wrapper.containsMatchingElement(<input type="checkbox" />)).toEqual(true);
  });

  it('should render "checkbox input" with label, when label and name are provided', () => {
    const inputProps = {
      label: 'Test',
      input: {
        name: 'testing'
      }
    };
    const wrapper = shallow(<CheckInput {...inputProps} />);

    expect(wrapper.containsMatchingElement(<input type="checkbox" />)).toEqual(true);
  });

  it('should render "checkbox input" with FieldHint, when name, label, and hint are provided', () => {
    const inputProps = {
      label: 'Test',
      input: {
        name: 'testing'
      },
      hint: 'Test Hint'
    };
    const wrapper = shallow(<CheckInput {...inputProps} />);

    expect(wrapper.find(FieldHint).length).toEqual(1);
    expect(wrapper.containsAnyMatchingElements([
      <input type="checkbox" name={inputProps.input.name} />,
      <label htmlFor={inputProps.input.name}>{inputProps.label}</label>
    ])).toEqual(true);
  });

  it('should render switch div if isSwitch is provided', () => {
    const wrapper = shallow(<CheckInput isSwitch />);

    expect(wrapper.containsMatchingElement(<div className="switch-div" />)).toEqual(true);
  });

  it('should fire off onChange and change value when label is clicked, if onChange and value are provided', () => {
    let checkValue = false;
    const onChange = (value) => {
      checkValue = value;
    };
    const inputProps = {
      label: 'Test',
      input: {
        name: 'testing',
        value: checkValue,
        onChange
      }
    };
    const wrapper = shallow(<CheckInput {...inputProps} />);
    wrapper.find('label').simulate('click');
    expect(checkValue).toEqual(true);
  });

  it('should fire off onChange and change value when input is clicked, if onChange and value are provided', () => {
    let checkValue = false;
    const onChange = (value) => {
      checkValue = value;
    };
    const inputProps = {
      label: 'Test',
      input: {
        name: 'testing',
        value: checkValue,
        onChange
      }
    };
    const wrapper = shallow(<CheckInput {...inputProps} />);
    wrapper.find('[name="testing"]').simulate('change');
    expect(checkValue).toEqual(true);
  });

  // TODO: Check renders
  // TODO: Check classnames
  // TODO: Check props
  // TODO: Check event handlers
});
