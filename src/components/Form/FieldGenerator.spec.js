import React from 'react';
import { shallow } from 'enzyme';
import FieldGenerator from './FieldGenerator';

// TODO: Write out the unit and integration tests for this
// Reference: https://github.com/tylercollier/redux-form-test
describe('<FieldGenerator />', () => {
  let onSubmit;
  const question = {};

  it('renders when mounted with handleSubmit', () => {
    const wrapper = shallow(
      <FieldGenerator
        question={question}
        handleSubmit={onSubmit}
      />
    );

    expect(wrapper);
  });

  it('should render select input', () => {
    const inputProps = {
      handleSubmit: onSubmit,
      question: { answerType: 'select' }
    };

    const wrapper = shallow(<FieldGenerator {...inputProps} />);

    expect(wrapper);
    // Need to take into account blank option
    expect(wrapper.find('option').length).toEqual(0);
  });

  it('should render radio input', () => {
    const inputProps = {
      handleSubmit: onSubmit,
      question: { answerType: 'radio', answers: [] }
    };

    const wrapper = shallow(<FieldGenerator {...inputProps} />);

    expect(wrapper);
    expect(wrapper.find('input'));
  });

  it('should render dropdown from radio input', () => {
    const inputProps = {
      handleSubmit: onSubmit,
      question: { answerType: 'radio', answers: [{}, {}, {}, {}, {}, {}, {}] }
    };

    const wrapper = shallow(<FieldGenerator {...inputProps} />);

    expect(wrapper);
    expect(wrapper.find('select'));
  });

  it('should render dropdown from radio input for long radio answers', () => {
    const inputProps = {
      handleSubmit: onSubmit,
      question: { answerType: 'radio', answers: [{}, {}, {}] }
    };

    const wrapper = shallow(<FieldGenerator {...inputProps} />);

    expect(wrapper);
    expect(wrapper.find('select'));
  });

  it('should check for hidden', () => {
    const inputProps = {
      handleSubmit: onSubmit,
      question: { hidden: true },
      type: 'hidden'
    };

    const wrapper = shallow(<FieldGenerator {...inputProps} />);

    expect(inputProps.type).toEqual('hidden');
    expect(wrapper.find('input'));
  });

  it('should check for header', () => {
    const inputProps = {
      label: 'This is a header',
      handleSubmit: onSubmit,
      question: { answerType: 'heading' }
    };

    const wrapper = shallow(<FieldGenerator {...inputProps} />);

    expect(wrapper.find('span'));
  });

  it('should check for text', () => {
    const inputProps = {
      handleSubmit: onSubmit,
      question: { answerType: 'text' }
    };

    const wrapper = shallow(<FieldGenerator {...inputProps} />);

    expect(wrapper.find('input'));
  });

  it('should check for date', () => {
    const inputProps = {
      handleSubmit: onSubmit,
      question: { answerType: 'date' }
    };

    const wrapper = shallow(<FieldGenerator {...inputProps} />);

    expect(wrapper.find('input'));
  });

  it('should check for range', () => {
    const inputProps = {
      handleSubmit: onSubmit,
      question: { answerType: 'range' }
    };

    const wrapper = shallow(<FieldGenerator {...inputProps} />);

    expect(wrapper.find('input'));
  });

  it('should check for slider', () => {
    const inputProps = {
      handleSubmit: onSubmit,
      question: { answerType: 'slider' }
    };

    const wrapper = shallow(<FieldGenerator {...inputProps} />);

    expect(wrapper.find('input'));
  });

  it('should check for display', () => {
    const inputProps = {
      handleSubmit: onSubmit,
      question: { answerType: 'display' }
    };

    const wrapper = shallow(<FieldGenerator {...inputProps} />);

    expect(wrapper.find('input'));
  });

  it('should check for bool', () => {
    const inputProps = {
      handleSubmit: onSubmit,
      question: { answerType: 'bool' }
    };

    const wrapper = shallow(<FieldGenerator {...inputProps} />);

    expect(wrapper.find('input'));
  });

  it('should check for conditional', () => {
    const inputProps = {
      handleSubmit: onSubmit,
      question: { conditional: { slider: { minLocation: '', maxLocation: '' } } },
      data: [],
      values: []
    };

    const wrapper = shallow(<FieldGenerator {...inputProps} />);

    expect(wrapper);
  });
});
