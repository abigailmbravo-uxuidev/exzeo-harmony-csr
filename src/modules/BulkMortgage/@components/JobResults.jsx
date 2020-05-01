import React from 'react';
import { Button } from '@exzeo/core-ui';
import { BUTTON_CLASS, BUTTON_SIZE } from '@exzeo/core-ui/src/Button/Button';
import QueuedMortgageeCard from './QueuedMortgageeCard';
import JobCard from './JobCard';

const JobResults = ({ results }) => {
  return (
    <React.Fragment>
      <div className="queue-header">
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
