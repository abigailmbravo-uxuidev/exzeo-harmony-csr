import MortgageeCard from './MortgageeCard';
import React from 'react';
import { Form, noop, SectionLoader } from '@exzeo/core-ui';

export const SearchByPolicyResults = ({
  handleQueue,
  mortgageeResults,
  showLoader
}) => {
  if (showLoader) {
    return <SectionLoader />;
  }

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
            return (
              <MortgageeCard
                key={m._id}
                mortgagee={m}
                handleQueue={() => handleQueue({ ...m, ...values })}
              />
            );
          })}
        </form>
      )}
    </Form>
  );
};

export default SearchByPolicyResults;
