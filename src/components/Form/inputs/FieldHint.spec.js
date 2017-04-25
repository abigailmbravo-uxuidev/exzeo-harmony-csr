import React from 'react';
import { shallow } from 'enzyme';
import FieldHint from './FieldHint';

describe('FieldHint', () => {
  it('should render component when hint and name are provided', () => {
    const hintProps = {
      hint: 'hint',
      name: 'test'
    };
    const wrapper = shallow(<FieldHint {...hintProps} />);

    expect(wrapper);
  });

  // TODO: Check renders
  // TODO: Check classnames
  // TODO: Check props
  // TODO: Check event handlers
});
