import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import { DEFAULT_SEARCH_PARAMS, SEARCH_FORM } from '../../../constants/search';

export class SearchBar extends Component {
  componentDidMount() {
    const {
      agencies,
      formProps: { handleSubmit },
      handleSearchSubmit,
      getAgencies,
      toggleLoading,
      searchType
    } = this.props;

    toggleLoading(false);
    if (!agencies.length) {
      getAgencies(
        DEFAULT_SEARCH_PARAMS.companyCode,
        DEFAULT_SEARCH_PARAMS.state
      );
    }

    if (searchType === 'diaries') {
      handleSubmit(handleSearchSubmit)();
    }
  }

  handlePagination = isNext => {
    const {
      formProps: { handleSubmit }
    } = this.props;

    return handleSubmit((data, dispatch, props) => {
      // submit function is looking for these two added properties to determine if this is an initial submit or pagination submit.
      console.log(data);
      const submitData = {
        ...data,
        isNext,
        currentPage: props.currentPage
      };
      props.handleSearchSubmit(submitData, dispatch, props);
    });
  };

  changeSearchType = (event, newValue) => {
    const { changeSearchType } = this.props;
    changeSearchType(newValue);
    this.clearForm();
  };

  clearForm = () => {
    const {
      clearAppError,
      formProps: { reset },
      toggleLoading
    } = this.props;
    reset();
    clearAppError();
    toggleLoading(false);
  };

  render() {
    const { formProps, handleSearchSubmit } = this.props;

    return (
      <div id="SearchBar">
        <form onSubmit={formProps.handleSubmit(handleSearchSubmit)}>
          <div className="search-input-wrapper">
            {// render the correct search form based on searchType (declared in Search/index.js)
            this.props.render({
              changeSearchType: this.changeSearchType,
              handlePagination: this.handlePagination,
              formProps
            })}
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  // 'initialValues' prop is being passed in from parent component based on route/pathName
  form: SEARCH_FORM,
  enableReinitialize: true,
  propNamespace: 'formProps'
})(SearchBar);
