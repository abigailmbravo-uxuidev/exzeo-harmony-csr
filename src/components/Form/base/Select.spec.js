import React from 'react';
import { shallow } from 'enzyme';
import SelectInput from './Select';

describe('Test the Select Component', () => {
  it('Should Render', () => {
    const input = {
      onChange() {},
      name: 'test'
    };
    const meta = {};
    const wrapper = shallow(<SelectInput input={input} meta={meta} />);
    expect(wrapper.props().className).toEqual('form-group test');
  });
});
