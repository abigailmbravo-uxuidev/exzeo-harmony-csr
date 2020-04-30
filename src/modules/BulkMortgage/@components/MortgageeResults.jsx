import MortgageeCard from './MortgageeCard';
import React from 'react';
import { Form, noop, SectionLoader } from '@exzeo/core-ui';
import { setMortgageeInitialValues } from '../utilities';

export const MortgageeResults = ({ handleQueue, results, showLoader }) => {
  if (showLoader) {
    return <SectionLoader />;
  }

  return (
    <Form
      id="PolicyResults"
      enableReinitialize={true}
      initialValues={setMortgageeInitialValues(results)}
      onSubmit={noop}
      subscription={{ submitting: true, values: true }}
    >
      {({ handleSubmit, values }) => (
        <form
          id="PolicyResults"
          onSubmit={handleSubmit}
          className="search-results"
        >
          {results.map(m => {
            return (
              <MortgageeCard
                key={m._id}
                result={m}
                handleQueue={() => handleQueue({ ...values[m._id] })}
              />
            );
          })}
        </form>
      )}
    </Form>
  );
};

export default MortgageeResults;
