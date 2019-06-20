import React from 'react';
import { shallow } from 'enzyme';
import { SEARCH_TYPES, NO_RESULTS_MESSAGES } from '../../../constants/search';
import NoResults from './NoResults';

describe('Test the NoResults component', () => {
  it('renders without crashing by default', () => {
    const wrapper = shallow(<NoResults />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders an error message when error object is provided', () => {
    const wrapper = shallow(<NoResults error={{ message: 'ooops!' }} />);
    expect(wrapper.find('p').prop('children')).toBe('ooops!');
  });

  it('renders the correct message based on searchType', () => {
    const wrapper = shallow(<NoResults searchType={SEARCH_TYPES.policy} />);
    expect(wrapper.find('p').prop('children')).toBe(NO_RESULTS_MESSAGES.policy);
  });
});
