import React from 'react';
import MortgageeForm from './MortgageeForm';
import SearchByPolicy from './SearchByPolicy';
import MortgageeResults from './MortgageeResults';
import classNames from 'classnames';

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
      className={classNames(
        'bm-wrapper',
        'by-policy',
        'form-group',
        'survey-wrapper'
      )}
      role="group"
    >
      <section className={classNames('bm-byPolicy', 'mortgagee-wrapper')}>
        <MortgageeForm
          handleFormSubmit={handleBulkUpdateSubmit}
          errorHandler={errorHandler}
        />
      </section>
      <section className={classNames('bm-byPolicy', 'search-results-wrapper')}>
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
