import React, { useState } from 'react';
import JobFilter from './JobFilter';
import { useFetchUsersForJobs } from '../hooks';
import { connect } from 'react-redux';
import JobResults from './JobResults';
import { getMortgageeJobs } from '../data';
import { date } from '@exzeo/core-ui/src';
import Pagination from '../../Search/components/Pagination';

export const ByJob = ({ userProfile, errorHandler }) => {
  const [jobResults, setJobResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filterValues, setFilterValues] = useState({
    dateRange: {
      start: date.addDate({
        addValue: -1,
        unit: 'd',
        format: date.FORMATS.SECONDARY
      }),
      end: date.formatDate(undefined, date.FORMATS.SECONDARY)
    }
  });
  const [showLoader, setShowLoader] = useState(false);
  const { userList } = useFetchUsersForJobs({ userProfile, errorHandler });

  const handlePagination = advance => async () => {
    const pageNumber = advance ? currentPage + 1 : currentPage - 1;
    await searchMortgageeJobs(filterValues, pageNumber);
  };

  const searchMortgageeJobs = async (data, pageNumber) => {
    try {
      const { jobId, userName, name } = data;
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

      const { jobs, page, totalJobs, pageSize } = await getMortgageeJobs({
        windowStart,
        windowEnd,
        pageNumber,
        jobId,
        userName,
        name
      });

      setCurrentPage(page);
      setTotalPages(Math.ceil(totalJobs / pageSize) || 0);

      setJobResults(jobs);
      setFilterValues(data);
    } catch (error) {
      errorHandler(error);
    } finally {
      setShowLoader(false);
    }
  };

  const handleJobSubmit = async data => {
    await searchMortgageeJobs(data, 1);
  };

  return (
    <div className="bm-wrapper by-job form-group survey-wrapper" role="group">
      <section className="bm-byJob mortgagee-wrapper">
        <div className="queue-header">
          <div className="title">Filter Parameters</div>
        </div>
        <JobFilter
          initialValues={filterValues}
          userList={userList}
          handleJobSubmit={handleJobSubmit}
        />
      </section>
      <section className="bm-byJob search-results-wrapper">
        {totalPages > 0 && (
          <Pagination
            changePageForward={handlePagination(true)}
            changePageBack={handlePagination(false)}
            pageNumber={currentPage}
            totalPages={totalPages}
          />
        )}
        <JobResults results={jobResults} showLoader={showLoader} />
      </section>
    </div>
  );
};

const mapStateToProps = state => ({
  userProfile: state.authState.userProfile
});

export default connect(mapStateToProps)(ByJob);
