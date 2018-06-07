import React from 'react';
import configureStore from 'redux-mock-store';


import { shallow } from 'enzyme';
import { SearchBar } from './SearchBar';

const mockStore = configureStore([]);
const store = mockStore({});

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
  const wrapper = shallow(<SearchBar
    store={store}
    {...props}
  />);
  expect(wrapper);
  const instance = wrapper.instance();
  instance.handleSearchFormSubmit({}, () => {}, props);
  instance.handlePagination(true);
  instance.changeSearchType({}, 'quote');
});
