import React from 'react';
import { shallow } from 'enzyme';
import { PhoneInput } from './PhoneField';

describe('PhoneInput', () => {
  it('should render "phone input" with label, when label and name are provided', () => {
    const inputProps = {
      label: 'Test',
      input: {
        name: 'testing'
      }
    };
    const wrapper = shallow(<PhoneInput {...inputProps} />);

    expect(wrapper);
  });
});
