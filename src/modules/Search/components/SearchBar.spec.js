import React from 'react';
import { shallow } from 'enzyme';
import { SearchBar } from './SearchBar';

describe('Test SearchBar component', () => {
  it('renders SearchBar', () => {
    const props = {
      handleSubmit() {},
      render() {},
      toggleLoading() {},
      getAgencies() {},
      changeSearchType() {},
      resetSearch() {},
      reset() {},
      clearAppError() {},
      advancedSearch: true,
      toggleAdvancedSearch() {}
    };

    const wrapper = shallow(<SearchBar {...props} />);
    const instance = wrapper.instance();

    expect(wrapper.exists()).toBeTruthy();
    instance.handleSearchFormSubmit({}, () => {}, props);
    instance.handlePagination(true);
    instance.changeSearchType({}, 'quote');
  });
});
