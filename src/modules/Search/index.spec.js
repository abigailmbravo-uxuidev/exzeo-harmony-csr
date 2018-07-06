import React from 'react';
import { shallow, mount } from 'enzyme';
import { SEARCH_TYPES } from '../../constants/search';
import Search from './index';

describe('Test Search component class', () => {

  it('should render with initialState set', () => {
    const wrapper = shallow(<Search pathName='/' />);

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.state().advancedSearch).toEqual(false);
    expect(wrapper.state().searchType).toEqual(SEARCH_TYPES.policy);
  });

  it('should set searchType based on pathName once mounted', () => {
    const wrapper = shallow(<Search pathName='/agency' />);
    const instance = wrapper.instance();

    expect(wrapper.state().searchType).toEqual(SEARCH_TYPES.agency)
  });

  it('should handle searchType change', () => {
    const wrapper = shallow(<Search pathName='/' />);
    const instance = wrapper.instance();

    instance.changeSearchType(SEARCH_TYPES.newQuote);

    expect(wrapper.state().searchType).toEqual(SEARCH_TYPES.newQuote);
  });

  it('should handle toggling advancedSearch', () => {
    const wrapper = shallow(<Search pathName />);
    const initialAdvancedSearch = wrapper.state().advancedSearch;
    const instance = wrapper.instance();

    instance.toggleAdvancedSearch();

    expect(wrapper.state().advancedSearch).toEqual(!initialAdvancedSearch)
  })
});
