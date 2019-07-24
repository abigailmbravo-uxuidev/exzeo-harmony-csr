import React from 'react';
import { shallow } from 'enzyme';
import { SEARCH_TYPES } from '../../constants/search';
import { SearchPage } from './index';

// TODO temp fix until Auth is updated
const stubProfile = { profile: {} };

describe('Test Search component class', () => {
  it('should render with initialState set', () => {
    const wrapper = shallow(
      <SearchPage pathName="/" userProfile={stubProfile} />
    );

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.state().advancedSearch).toEqual(false);
    expect(wrapper.state().searchType).toEqual(SEARCH_TYPES.policy);
  });

  it('should set searchType based on pathName once mounted', () => {
    const wrapper = shallow(
      <SearchPage pathName="/agency" userProfile={stubProfile} />
    );
    const instance = wrapper.instance();

    expect(wrapper.state().searchType).toEqual(SEARCH_TYPES.agency);
  });

  it('should handle searchType change', () => {
    const wrapper = shallow(
      <SearchPage
        pathName="/"
        resetSearch={() => {}}
        userProfile={stubProfile}
      />
    );
    const instance = wrapper.instance();

    instance.changeSearchType(SEARCH_TYPES.newQuote);

    expect(wrapper.state().searchType).toEqual(SEARCH_TYPES.newQuote);
  });

  it('should handle toggling advancedSearch', () => {
    const wrapper = shallow(
      <SearchPage pathName="/" userProfile={stubProfile} />
    );
    const initialAdvancedSearch = wrapper.state().advancedSearch;
    const instance = wrapper.instance();

    instance.toggleAdvancedSearch();

    expect(wrapper.state().advancedSearch).toEqual(!initialAdvancedSearch);
  });
});
