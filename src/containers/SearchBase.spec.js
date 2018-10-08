import React from 'react';
import { shallow } from 'enzyme';
import { SearchBase } from './SearchBase';

describe('Policy Search', () => {
  it('renders Policy Search container', () => {
    const wrapper = shallow(<SearchBase getUIQuestions={x => x} startWorkflow={x => x} location={{ pathName: 'test' }} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});

