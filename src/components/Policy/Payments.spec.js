import React from 'react';
import { shallow } from 'enzyme';
import Payments from './Payments';

describe('Test the Payments Component', () => {
  it('Should Render', () => {
    const wrapper = shallow(<Payments payments={[]} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
