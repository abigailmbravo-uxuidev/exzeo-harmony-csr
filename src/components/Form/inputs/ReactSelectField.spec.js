import React from 'react';
import { shallow } from 'enzyme';
import ReactSelectField, { ReactSelectInput } from './ReactSelectField';

describe('ReactSelectField', () => {
  it('should render "select input" when nothing is provided', () => {
    const wrapper = shallow(<ReactSelectField name="Test" label="test" />);
    expect(wrapper.find('option').length).toEqual(0);
  });

  it('should render "select input" with answers when answers are provided', () => {
    const inputProps = {
      meta: {
        touched: false

      },
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

    shallow(<ReactSelectInput {...inputProps} />);
    const wrapperInstance = shallow(<ReactSelectField {...inputProps} />);
    expect(wrapperInstance.instance().props.answers.length).toEqual(3);
  });
});
