import React from 'react';
import { shallow } from 'enzyme';
import { SEARCH_TYPES } from '../../constants/search';
import { SearchPage } from './index';

// TODO temp fix until Auth is updated
const stubProfile = { profile: {} };

const defaultProps = {
  getEnumsForSearch() {}
};

describe('Test Search component class', () => {
  it('should render with initialState set', () => {
    const wrapper = shallow(
      <SearchPage {...defaultProps} pathName="/" userProfile={stubProfile} />
    );

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.state().searchType).toEqual(SEARCH_TYPES.policy);
  });

  it('should set searchType based on pathName once mounted', () => {
    const wrapper = shallow(
      <SearchPage
        {...defaultProps}
        pathName="/agency"
        userProfile={stubProfile}
      />
    );
    const instance = wrapper.instance();

    expect(wrapper.state().searchType).toEqual(SEARCH_TYPES.agency);
  });

  it('should handle searchType change', () => {
    const wrapper = shallow(
      <SearchPage
        {...defaultProps}
        pathName="/"
        resetSearch={() => {}}
        userProfile={stubProfile}
      />
    );
    const instance = wrapper.instance();

    instance.changeSearchType(SEARCH_TYPES.newQuote);

    expect(wrapper.state().searchType).toEqual(SEARCH_TYPES.newQuote);
  });
});
