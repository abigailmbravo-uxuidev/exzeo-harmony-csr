import React from 'react';
import { shallow } from 'enzyme';
import ReactSelectField from './ReactSelectField';
import FieldHint from './FieldHint';

describe('ReactSelectField', () => {
  it('should render "select input" when nothing is provided', () => {
    const wrapper = shallow(<ReactSelectField name="Test" label="test" />);
    expect(wrapper.find('option').length).toEqual(0);
  });

  it('should render "select input" with answers when answers are provided', () => {
    const inputProps = {
      name: 'test',
      label: 'test',
      answers: [{
        answer: 'One'
      }, {
        answer: 'Two'
      }, {
        answer: 'Three'
      }]
    };

    const wrapper = shallow(<ReactSelectField {...inputProps} />);
    expect(wrapper.prop('answers').length).toEqual(3);
  });
});
