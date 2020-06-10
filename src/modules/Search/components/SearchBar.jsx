import React from 'react';
import { Form, OnChangeListener } from '@exzeo/core-ui';

const SearchBar = ({
  handleSearchSubmit,
  initialValues,
  render,
  changeSearchType
}) => {
  const handlePagination = isNext => {
    // const {
    //   formProps: { handleSubmit }
    // } = this.props;
    //
    // return handleSubmit((data, dispatch, props) => {
    //   // submit function is looking for these two added properties to determine if this is an initial submit or pagination submit.
    //   const submitData = {
    //     ...data,
    //     isNext,
    //     currentPage: props.currentPage
    //   };
    //   props.handleSearchSubmit(submitData, dispatch, props);
    // });
  };

  const handleChangeSearchType = newValue => {
    changeSearchType(newValue);

    // TODO: This was in componentDidMount
    /*
     if (searchType === 'diaries') {
      handleSubmit(handleSearchSubmit)();
    }
     */

    // this.clearForm();
  };

  return (
    <Form
      onSubmit={handleSearchSubmit}
      initialValues={initialValues}
      subscription={{ submitting: true, values: true }}
      render={({ handleSubmit, form, values }) => (
        <div id="SearchBar">
          <form id="SearchBarForm" onSubmit={handleSubmit}>
            <div className="search-input-wrapper">
              {// render the correct search form based on searchType (declared in Search/index.js)
              render({
                handlePagination: handlePagination,
                formProps: values
              })}
            </div>
            <OnChangeListener name="searchType">
              {value => {
                if (!value) return;
                handleChangeSearchType(value);
              }}
            </OnChangeListener>
          </form>
        </div>
      )}
    />
  );
};

export default SearchBar;
