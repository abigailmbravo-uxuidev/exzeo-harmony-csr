import React from 'react';
import JobCard from './JobCard';
import { SectionLoader } from '@exzeo/core-ui';

const JobResults = ({ results, showLoader }) => {
  if (showLoader) {
    return <SectionLoader />;
  }
  return (
    <React.Fragment>
      <div className="job-header">
        <div className="title">Jobs</div>
      </div>
      <section className="policy-list">
        {results.map(j => (
          <JobCard key={j._id} result={j} />
        ))}
      </section>
    </React.Fragment>
  );
};

export default JobResults;
