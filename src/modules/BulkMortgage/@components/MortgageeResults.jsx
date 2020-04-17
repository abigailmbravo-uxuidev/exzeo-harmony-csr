import MortgageeCard from './MortgageeCard';
import React from 'react';
import { Form, noop, SectionLoader } from '@exzeo/core-ui';

export const MortgageeResults = ({ handleQueue, results, showLoader }) => {
  if (showLoader) {
    return <SectionLoader />;
  }

  return (
    <Form
      id="PolicyResults"
      onSubmit={noop}
      subscription={{ submitting: true, values: true }}
    >
      {({ handleSubmit, form, values }) => (
        <form
          id="PolicyResults"
          onSubmit={handleSubmit}
          className="search-results"
        >
          {results.map(m => {
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

export default MortgageeResults;
