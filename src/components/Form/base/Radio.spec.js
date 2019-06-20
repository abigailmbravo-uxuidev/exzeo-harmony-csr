import React from 'react';
import { shallow } from 'enzyme';
import RadioInput from './Radio';

describe('Test the Radio Component', () => {
  const input = {
    onChange() {},
    name: 'test'
  };
  it('Should Render', () => {
    const wrapper = shallow(<RadioInput input={input} size={1} />);
    expect(wrapper.find('input').prop('name')).toEqual('test');
    wrapper.find('div.radio-column-1').simulate('click');
  });

  it('should handle error and warning messages', () => {
    const meta = {
      touched: true,
      error: 'help',
      warning: 'please'
    };

    const wrapper = shallow(<RadioInput input={input} meta={meta} size={1} />);
  });
});
