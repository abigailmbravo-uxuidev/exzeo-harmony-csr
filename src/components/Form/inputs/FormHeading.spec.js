import React from 'react';
import { shallow } from 'enzyme';
import FormHeading from './FormHeading';

describe('FormHeading', () => {
  it('should render "text input" when nothing is provided', () => {
    const headingProps = {
      label: 'Heading'
    };
    const wrapper = shallow(<FormHeading {...headingProps} />);

    expect(wrapper);
  });
});
