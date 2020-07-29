import React from 'react';
import PropTypes from 'prop-types';
import { NO_RESULTS_MESSAGES } from '../../../constants/search';

function NoResults({ searchType, error }) {
  if (error && error.message) {
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
              <p>{error.message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="results">
      <div className="card">
        <div className="card-header">
          <h4>
            <i className="fa fa-frown-o " /> No Results Found
          </h4>
        </div>
        <div className="card-block">
          <p>{NO_RESULTS_MESSAGES[searchType]}</p>
        </div>
      </div>
    </div>
  );
}

NoResults.propTypes = {
  searchType: PropTypes.string,
  error: PropTypes.object
};

NoResults.defaultProps = {
  error: {}
};

export default NoResults;
