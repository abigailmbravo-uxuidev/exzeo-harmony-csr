import React, { useState } from 'react';

import { Input, Select, Button, Field, Form, noop } from '@exzeo/core-ui';

export const SearchByPolicy = ({ handleSearchMortgagee }) => {
  return (
    <Form
      id="SearchByPolicy"
      onSubmit={handleSearchMortgagee}
      subscription={{ submitting: true, values: true }}
    >
      {({ handleSubmit, form, values }) => (
        <form
          id="SearchByPolicy"
          className="search-by-policy-form"
          onSubmit={handleSubmit}
          className="search-inputs"
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
