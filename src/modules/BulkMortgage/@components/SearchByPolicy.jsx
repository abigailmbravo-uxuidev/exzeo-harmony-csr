import React from 'react';
import classNames from 'classnames';
import { Input, Select, Button, Field, Form } from '@exzeo/core-ui';

export const SearchByPolicy = ({ handleSearchMortgagee }) => {
  return (
    <Form
      id="SearchByPolicy"
      onSubmit={handleSearchMortgagee}
      subscription={{ submitting: true, values: true }}
    >
      {({ handleSubmit }) => (
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
            answers={[]}
          />
          <Field
            name="searchType"
            dataTest="searchType"
            label="Search Type"
            component={Select}
            styleName="search-type"
            answers={[]}
          />
          <Field
            name="policyNumber"
            dataTest="policyNumber"
            label="Search"
            placeholder="Search By Policy Number (partial)"
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
