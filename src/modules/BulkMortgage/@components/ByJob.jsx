import React, { useState } from 'react';
import { date } from '@exzeo/core-ui';
import { Pagination } from '@exzeo/core-ui/src/@Harmony';

import JobFilter from './JobFilter';
import { useFetchUsersForJobs } from '../hooks';
import JobResults from './JobResults';
import { getMortgageeJobs } from '../data';
import NoResults from './NoResults';

export const ByJob = ({ userProfile, errorHandler }) => {
  const [jobResults, setJobResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
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
      setHasSearched(true);
      setFilterValues(data);
    } catch (error) {
      errorHandler(error);
      setJobResults([]);
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
            pageUp={handlePagination(true)}
            pageDown={handlePagination(false)}
            pageNumber={currentPage}
            totalPages={totalPages}
          />
        )}
        <JobResults results={jobResults} showLoader={showLoader} />
        {hasSearched && jobResults.length === 0 && (
          <NoResults body={`Please refine your search`} />
        )}
      </section>
    </div>
  );
};

export default ByJob;
