import React from 'react';

export const NoPolicyResults = () => (
  <div className="survey-wrapper">
    <div className="card no-results">
      <div className="card-header"><h4>No Results Found</h4></div>
      <div className="card-block">
        <p>There are no policies found matching that search criteria. Please try to search again.</p>
      </div>
    </div>
  </div>
);


export default NoPolicyResults;

