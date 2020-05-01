import React, { useState } from 'react';
import JobFilter from './JobFilter';
import { useFetchUsersForJobs } from '../hooks';
import { connect } from 'react-redux';
import { jobs } from '../__tests__/testJobs';
import JobResults from './JobResults';

export const ByJobTab = ({ userProfile, errorHandler }) => {
  const [jobResults, setJobResults] = useState([]);
  const { userList } = useFetchUsersForJobs({ userProfile, errorHandler });

  const handleJobSubmit = () => {
    setJobResults(jobs);
  };

  return (
    <div className="bm-wrapper by-job form-group survey-wrapper" role="group">
      <section className="bm-byJob mortgagee-wrapper">
        <div className="queue-header">
          <div className="title">Filter Parameters</div>
        </div>
        <JobFilter userList={userList} handleJobSubmit={handleJobSubmit} />
      </section>
      <section className="bm-byJob search-results-wrapper">
        <JobResults results={jobResults} />
      </section>
    </div>
  );
};

const mapStateToProps = state => ({
  userProfile: state.authState.userProfile
});

export default connect(mapStateToProps)(ByJobTab);
