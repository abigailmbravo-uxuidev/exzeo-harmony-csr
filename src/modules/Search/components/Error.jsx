import React from 'react';

const Error = ({ error }) => {
  return (
    <div className="results">
      <div className="result-cards">
        <div className="card">
          <div className="card-header">
            <h4>
              <i className="fa fa-frown-o " />
              Error
            </h4>
          </div>
          <div className="card-block">
            <p>{error.message || 'Something went wrong! Please try again.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
