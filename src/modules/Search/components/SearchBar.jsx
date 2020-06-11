import React, { useState } from 'react';
import { Form, FormSpy, OnChangeListener } from '@exzeo/core-ui';

const SearchBar = ({
  handleSearchSubmit,
  initialValues,
  render,
  changeSearchType,
  currentPage
}) => {
  const [formInstance, setFormInstance] = useState(undefined);

  const handlePagination = isNext => {
    const formValues = formInstance.getState().values;
    const submitData = {
      ...formValues,
      isNext,
      currentPage
    };
    return handleSearchSubmit(submitData);
  };

  const handleChangeSearchType = newValue => {
    changeSearchType(newValue);
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
                formProps: values,
                initialValues: initialValues,
                handleSearchSubmit
              })}
            </div>
            <OnChangeListener name="searchType">
              {value => {
                if (!value) return;
                handleChangeSearchType(value);
              }}
            </OnChangeListener>
            <FormSpy subscription={{}}>
              {() => {
                if (!formInstance) {
                  setFormInstance(form);
                }
                return null;
              }}
            </FormSpy>
          </form>
        </div>
      )}
    />
  );
};

export default SearchBar;
