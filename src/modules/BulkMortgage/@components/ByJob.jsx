import React, { useState } from 'react';
import JobFilter from './JobFilter';
import { useFetchUsersForJobs } from '../hooks';
import { connect } from 'react-redux';
import JobResults from './JobResults';
import { getMortgageeJobs } from '../data';
import { filterJobs } from '../utilities';
import { date } from '@exzeo/core-ui/src';

export const ByJob = ({ userProfile, errorHandler }) => {
  const [jobResults, setJobResults] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const { userList } = useFetchUsersForJobs({ userProfile, errorHandler });

  const handleJobSubmit = async data => {
    try {
      setShowLoader(true);
      const dateFormat = 'YYYY-MM-DDTHH:mm:ss.SSSS';

      const windowStart = data?.dateRange?.start
        ? date.formatDate(data.dateRange.start, dateFormat)
        : '';

      const windowEnd = data?.dateRange?.end
        ? date.addDate({
            dateString: data.dateRange.end,
            addValue: 1,
            unit: 'd',
            format: dateFormat
          })
        : '';

      const jobData = await getMortgageeJobs({
        windowStart,
        windowEnd
      });

      setJobResults(filterJobs({ ...data, jobResults: jobData }));
    } catch (error) {
      errorHandler(error);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <div className="bm-wrapper by-job form-group survey-wrapper" role="group">
      <section className="bm-byJob mortgagee-wrapper">
        <div className="queue-header">
          <div className="title">Filter Parameters</div>
        </div>
        <JobFilter
          initialValues={{
            dateRange: {
              start: date.addDate({
                addValue: -1,
                unit: 'd',
                format: date.FORMATS.SECONDARY
              }),
              end: date.formatDate(undefined, date.FORMATS.SECONDARY)
            }
          }}
          userList={userList}
          handleJobSubmit={handleJobSubmit}
        />
      </section>
      <section className="bm-byJob search-results-wrapper">
        <JobResults results={jobResults} showLoader={showLoader} />
      </section>
    </div>
  );
};

const mapStateToProps = state => ({
  userProfile: state.authState.userProfile
});

export default connect(mapStateToProps)(ByJob);
