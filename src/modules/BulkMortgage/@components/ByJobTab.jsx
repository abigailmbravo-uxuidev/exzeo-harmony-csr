import React from 'react';

export const ByJobTab = () => {
  // const { mortgageeJobs, lodaed } = useFetchMortgageeJobs();
  return (
    <div className="bm-wrapper by-job form-group survey-wrapper" role="group">
      <section className="bm-byJob mortgagee-wrapper"></section>
      <section className="bm-byJob search-results-wrapper">
        {/*<SearchbyJob handleSearch={handleSearchbyJob} />*/}
        {/*{hasSearched && mortgageeResults.length === 0 && <NoResults />}*/}
      </section>
    </div>
  );
};

export default ByJobTab;
