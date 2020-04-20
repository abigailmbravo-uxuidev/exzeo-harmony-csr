import React from 'react';
import MortgageeForm from './MortgageeForm';
import SearchByPolicy from './SearchByPolicy';
import MortgageeResults from './MortgageeResults';

export const ByPolicyTab = ({
  handleBulkUpdateSubmit,
  errorHandler,
  handleSearchByPolicy,
  showPolicySearchLoader,
  mortgageeResults,
  addToQueue
}) => {
  return (
    <div
      className="bm-wrapper by-policy form-group survey-wrapper"
      role="group"
    >
      <section className="bm-byPolicy mortgagee-wrapper">
        <MortgageeForm
          handleFormSubmit={handleBulkUpdateSubmit}
          errorHandler={errorHandler}
        />
      </section>
      <section className="bm-byPolicy search-results-wrapper">
        <SearchByPolicy handleSearch={handleSearchByPolicy} />

        <MortgageeResults
          showLoader={showPolicySearchLoader}
          results={mortgageeResults}
          handleQueue={addToQueue}
        />
      </section>
    </div>
  );
};

export default ByPolicyTab;
