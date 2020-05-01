import React from 'react';
import JobCard from './JobCard';

const JobResults = ({ results }) => {
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
