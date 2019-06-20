import React from 'react';
import { shallow } from 'enzyme';
import TextInput from './Input';

describe('Test the Input Component', () => {
  it('Should Render', () => {
    const wrapper = shallow(<TextInput name="test" />);
    expect(wrapper.find('input').prop('name')).toEqual('test');
  });
});
