import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { getAgencies } from '../../../actions/serviceActions';
import { clearAppError } from '../../../actions/errorActions';
import {
  handleSearchSubmit,
  resetSearch,
  toggleLoading
} from '../../../actions/searchActions';
import { LOCAL_STORAGE_KEY, DEFAULT_SEARCH_PARAMS } from '../constants';

import { Select } from '@exzeo/core-ui/lib/Input';
import { isRequired } from '@exzeo/core-ui/lib/InputLifecycle';

export class SearchBar extends Component {
  componentDidMount() {
    const { getAgencies, toggleLoading } = this.props;
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    toggleLoading(false);
    // TODO try to avoid doing this every time this component mounts. Maybe handle this higher up the component tree (which means we can then search agencies from state rather than hitting the server)
    getAgencies(DEFAULT_SEARCH_PARAMS.companyCode, DEFAULT_SEARCH_PARAMS.state);
  }

  handleSearchFormSubmit = (data, dispatch, props) => {
    dispatch(handleSearchSubmit(data, props));
  };

  handlePagination = (isNext) => {
    const { handleSubmit } = this.props;
    return handleSubmit((data, dispatch, props) => {
      const submitData = { ...data, isNext, currentPage: props.search.currentPage };
      dispatch(handleSearchSubmit(submitData, this.props));
    });
  };

  changeSearchType = (event, newValue) => {
    const { changeSearchType } = this.props;
    changeSearchType(newValue);
    this.clearForm();
  };

  clearForm = () => {
    const {
      reset, clearAppError, advancedSearch, toggleAdvancedSearch
    } = this.props;
    const lastSearchData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
    lastSearchData.searchType = '';
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lastSearchData));
    reset();
    clearAppError();
    toggleLoading(false);
    if (advancedSearch) {
      toggleAdvancedSearch();
    }
  };

  render() {
    const {
      handleSubmit,
      searchTypeOptions,
      submitting
    } = this.props;

    return (
      <div id="SearchBar">
        <form onSubmit={handleSubmit(this.handleSearchFormSubmit)}>
          <div className="search-input-wrapper">

            <div className="form-group search-context">
              <Field
                name="searchType"
                dataTest="searchType"
                label="Search Context"
                component={Select}
                id="searchType"
                validate={isRequired}
                onChange={this.changeSearchType}
                answers={searchTypeOptions}
                showPlaceholder={false}
              />
            </div>

            { // render the correct search form based on searchType (declared in Search/index.js)
              this.props.render({
              submitting,
              handlePagination: this.handlePagination
            })}

          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search
});

export default connect(mapStateToProps, {
  clearAppError,
  getAgencies,
  toggleLoading,
  handleSearchSubmit
})(reduxForm({ // initialValues prop is being passed in from parent component based on route/pathName
  form: 'SearchBar',
  enableReinitialize: true,
  destroyOnUnmount: false
})(SearchBar));
