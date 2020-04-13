import React from 'react';
import classNames from 'classnames';
import { Input, Select, Button, Field, Form } from '@exzeo/core-ui';
import {
  SEARCH_TYPE_ANSWERS,
  PRODUCTS,
  SEARCH_TYPE_PLACHOLDER
} from '../constants';

export const SearchByPolicy = ({ handleSearchMortgagee }) => {
  return (
    <Form
      id="SearchByPolicy"
      initialValues={{ searchType: 'policyNumber', product: 'All' }}
      onSubmit={handleSearchMortgagee}
      subscription={{ submitting: true, values: true }}
    >
      {({ handleSubmit, values }) => (
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
            name="policyNumber"
            dataTest="policyNumber"
            label="Search"
            placeholder={SEARCH_TYPE_PLACHOLDER[values.searchType]}
            component={Input}
            styleName="search-input"
          />
          <Button
            className={Button.constants.classNames.primary}
            type="submit"
            dataTest="submit"
          >
            Search
          </Button>
        </form>
      )}
    </Form>
  );
};

export default SearchByPolicy;
