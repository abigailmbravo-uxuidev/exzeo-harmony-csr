import React from 'react';

const NoResults = ({ body }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h4>
          <i className="fa fa-frown-o " /> No Results Found
        </h4>
      </div>
      <div className="card-block">{body}</div>
    </div>
  );
};

export default NoResults;
