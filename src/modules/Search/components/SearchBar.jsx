import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Select, validation } from '@exzeo/core-ui';

import { DEFAULT_SEARCH_PARAMS } from '../../../constants/search';
import { getAgencies } from '../../../state/actions/service.actions';
import { clearAppError } from '../../../state/actions/error.actions';
import {
  handleSearchSubmit,
  toggleLoading
} from '../../../state/actions/search.actions';

export class SearchBar extends Component {
  componentDidMount() {
    const {
      agencies, getAgencies, toggleLoading, initialize, initialValues
    } = this.props;
    toggleLoading(false);
    if (!agencies.length) {
      getAgencies(DEFAULT_SEARCH_PARAMS.companyCode, DEFAULT_SEARCH_PARAMS.state);
    }
    initialize(initialValues);
  }

  handleSearchFormSubmit = async (data, dispatch, props) => {
    const { handleSearchSubmit } = this.props;
    await handleSearchSubmit(data, props);
  };

  handlePagination = (isNext) => {
    const { handleSubmit } = this.props;
    return handleSubmit((data, dispatch, props) => {
      // submit function is looking for these two added properties to determine if this is an initial submit or pagination submit.
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
    const { clearAppError, reset } = this.props;
    reset();
    clearAppError();
    toggleLoading(false);
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
                validate={validation.isRequired}
                onChange={this.changeSearchType}
                answers={searchTypeOptions}
                showPlaceholder={false}
                errorHint />
            </div>

            {// render the correct search form based on searchType (declared in Search/index.js)
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
  search: state.search,
  agencies: state.service.agencies || []
});

export default connect(mapStateToProps, {
  clearAppError,
  getAgencies,
  toggleLoading,
  handleSearchSubmit
})(reduxForm({
  // 'initialValues' prop is being passed in from parent component based on route/pathName
  form: 'SEARCH_BAR'
})(SearchBar));
