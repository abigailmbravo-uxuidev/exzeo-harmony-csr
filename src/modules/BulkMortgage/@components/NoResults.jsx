import React from 'react';

const NoResults = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h4>
          <i className="fa fa-frown-o " /> No Results Found
        </h4>
      </div>
      <div className="card-block">
        Please refine your search or view policies queued below. Please note,
        cancelled policies are not available in this search.
      </div>
    </div>
  );
};

export default NoResults;
