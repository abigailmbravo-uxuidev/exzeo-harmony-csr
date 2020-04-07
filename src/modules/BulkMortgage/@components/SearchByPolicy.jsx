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
          onSubmit={handleSubmit}
          className="search-inputs"
        >
          <Field
            name="product"
            dataTest="product"
            label="Product"
            component={Select}
            styleName=""
            answers={[]}
          />
          <Field
            name="searchType"
            dataTest="searchType"
            label="Search Type"
            component={Select}
            styleName=""
            answers={[]}
          />
          <Field
            name="policyNumber"
            dataTest="policyNumber"
            label="Search"
            placeholder="Search By Policy Number (partial)"
            component={Input}
            styleName=""
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
