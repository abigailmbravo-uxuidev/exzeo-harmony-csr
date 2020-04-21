import React from 'react';
import classNames from 'classnames';
import { Input, Select, Button, Field, Form, validation } from '@exzeo/core-ui';
import {
  SEARCH_TYPE_ANSWERS,
  PRODUCTS,
  SEARCH_TYPE_PLACEHOLDER,
  SEARCH_TYPES
} from '../constants';
import SearchByPolicyWatcher from './SearchByPolicyWatcher';

export const SearchByPolicy = ({ handleSearch }) => {
  return (
    <Form
      id="SearchByPolicy"
      initialValues={{
        searchType: 'policyNumber',
        product: '',
        policyNumber: ''
      }}
      onSubmit={handleSearch}
      subscription={{ submitting: true, values: true }}
    >
      {({ handleSubmit, values, pristine }) => (
        <form
          id="SearchByPolicy"
          className={classNames('search-by-policy-form', 'search-inputs')}
          onSubmit={handleSubmit}
        >
          <Field
            name="product"
            dataTest="product"
            label="Product"
            component={Select}
            placeholderDisabled={false}
            placeholder="All"
            styleName="product"
            answers={PRODUCTS}
          />
          <Field
            name="searchType"
            dataTest="searchType"
            label="Search Type"
            component={Select}
            styleName="search-type"
            answers={SEARCH_TYPE_ANSWERS}
          />
          <Field
            name={SEARCH_TYPES[values.searchType]}
            dataTest={SEARCH_TYPES[values.searchType]}
            label="Search"
            placeholder={SEARCH_TYPE_PLACEHOLDER[values.searchType]}
            component={Input}
            styleName="search-input"
            validate={validation.isRequired}
          />
          <SearchByPolicyWatcher />
          <Button
            className={Button.constants.classNames.primary}
            type="submit"
            dataTest="submit"
            disabled={pristine}
          >
            Search
          </Button>
        </form>
      )}
    </Form>
  );
};

export default SearchByPolicy;
