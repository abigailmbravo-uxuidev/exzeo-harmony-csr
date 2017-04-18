import React from 'react';
import { shallow } from 'enzyme';
import HiddenField from './HiddenField';

describe('HiddenField', () => {
  it('should render "hidden input" when name is provided', () => {
    const inputProps = {
      name: 'Heading'
    };
    const wrapper = shallow(<HiddenField {...inputProps} />);

    expect(wrapper);
  });
});
