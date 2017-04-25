import React from 'react';
import { shallow } from 'enzyme';
import TextField from './TextField';
import reduxFormField from './reduxFormField';

describe('reduxFormField', () => {
  it('should render a component passed into redux form field', () => {
    const props = {
      answers: []
    };
    const wrapper = shallow(<reduxFormField {...TextField} {...props} />);

    expect(wrapper);
  });
});
