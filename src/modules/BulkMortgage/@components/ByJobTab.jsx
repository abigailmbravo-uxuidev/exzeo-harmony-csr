import React from 'react';
import JobFilter from './JobFilter';
import { useFetchUsersForJobs } from '../hooks';
import { connect } from 'react-redux';

export const ByJobTab = ({ userProfile, errorHandler }) => {
  // const { mortgageeJobs, lodaed } = useFetchMortgageeJobs();
  const { userList } = useFetchUsersForJobs({ userProfile, errorHandler });
  console.log(userProfile);
  return (
    <div className="bm-wrapper by-job form-group survey-wrapper" role="group">
      <section className="bm-byJob mortgagee-wrapper">
        <JobFilter userList={userList} />
      </section>
      <section className="bm-byJob search-results-wrapper">
        {/*<SearchbyJob handleSearch={handleSearchbyJob} />*/}
        {/*{hasSearched && mortgageeResults.length === 0 && <NoResults />}*/}
      </section>
    </div>
  );
};

const mapStateToProps = state => ({
  userProfile: state.authState.userProfile
});

export default connect(mapStateToProps)(ByJobTab);
