import React from 'react';

import { Input, Select, Button, Field, Form, noop } from '@exzeo/core-ui';

export const SearchByPolicy = ({ handleSubmit }) => {
  return (
    <Form
      onSubmit={handleSubmit}
      subscription={{ submitting: true, values: true }}
    >
      {({ form, values }) => (
        <React.Fragment>
          <form id="TransferFilter" className="search-inputs">
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
              size={Button.constants.sizes.small}
              type="submit"
              dataTest="submit"
            >
              Search
            </Button>
          </form>
        </React.Fragment>
      )}
    </Form>
  );
};

export default SearchByPolicy;
