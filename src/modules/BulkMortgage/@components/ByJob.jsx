import React, { useState } from 'react';
import JobFilter from './JobFilter';
import { useFetchUsersForJobs } from '../hooks';
import { connect } from 'react-redux';
import JobResults from './JobResults';
import { getMortgageeJobs } from '../data';
import { filterJobs } from '../utilities';
import { date } from '@exzeo/core-ui';

export const ByJob = ({ userProfile, errorHandler }) => {
  const [jobResults, setJobResults] = useState([]);
  const { userList } = useFetchUsersForJobs({ userProfile, errorHandler });

  const handleJobSubmit = async data => {
    try {
      // the endpoint format has to be exactly 24 characters for some reason
      const format = 'YYYY-MM-DDThh:mm:ss.SSSS';
      const jobData = await getMortgageeJobs({
        windowStart: data?.dateRange?.start
          ? date.formattedLocalDate(data.dateRange.start, format)
          : '',
        windowEnd: data?.dateRange?.end
          ? date.formattedLocalDate(data.dateRange.end, format)
          : ''
      });

      setJobResults(filterJobs({ ...data, jobResults: jobData }));
    } catch (error) {
      errorHandler(error);
    }
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

export default connect(mapStateToProps)(ByJob);
