import React from 'react';
import { Form, noop, SectionLoader } from '@exzeo/core-ui';
import { setMortgageeInitialValues } from '../utilities';
import MortgageeCard from './MortgageeCard';

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
                key={`${m._id}_${m.policyNumber}`}
                result={m}
                handleQueue={() => handleQueue({ ...values[m.identifier] })}
              />
            );
          })}
        </form>
      )}
    </Form>
  );
};

export default MortgageeResults;
