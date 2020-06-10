import React, { useState } from 'react';
import {
  Form,
  FormSpy,
  Loader,
  OnChangeListener,
  useForm
} from '@exzeo/core-ui';
import { Gandalf } from '@exzeo/core-ui/src/@Harmony';

const SearchBar = ({
  handleSearchSubmit,
  initialValues,
  render,
  changeSearchType,
  currentPage
}) => {
  const [formValues, setFormValues] = useState(initialValues);

  const handlePagination = isNext => {
    //  console.log(isNext)
    const submitData = {
      ...formValues,
      isNext,
      currentPage
    };
    return handleSearchSubmit(submitData);
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
      render={({ handleSubmit, values }) => (
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
            <FormSpy subscription={{}}>
              {() => {
                setFormValues(values);
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
