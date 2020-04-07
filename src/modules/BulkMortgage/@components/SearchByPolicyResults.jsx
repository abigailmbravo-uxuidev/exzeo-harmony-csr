import MortgageeCard from './MortgageeCard';
import React from 'react';
import { Input, Select, Button, Field, Form, noop } from '@exzeo/core-ui';

export const SearchByPolicyResults = ({ handleQueue, mortgageeResults }) => {
  return (
    <Form
      id="SearchByPolicyResults"
      onSubmit={noop}
      subscription={{ submitting: true, values: true }}
    >
      {({ handleSubmit, form, values }) => (
        <form
          id="SearchByPolicyResults"
          onSubmit={handleSubmit}
          className="search-results"
        >
          {mortgageeResults.map(m => {
            return <MortgageeCard mortgagee={m} handleQueue={handleQueue} />;
          })}
        </form>
      )}
    </Form>
  );
};

export default SearchByPolicyResults;
