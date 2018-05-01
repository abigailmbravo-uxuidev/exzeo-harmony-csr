import React from 'react';
import { shallow } from 'enzyme';
import RadioInput from './Radio';


describe('Test the Radio Component', () => {
  it('Should Render', () => {
    const input = {
      onChange() {},
      name: 'test'
    };
    const wrapper = shallow(<RadioInput input={input} />);
    expect(wrapper.find('input').prop('name')).toEqual('test');
  });
});
