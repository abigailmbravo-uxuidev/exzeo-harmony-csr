import React from 'react';

const DEFAULT_NO_RESULTS_MESSAGE = 'We\'re sorry we couldn\'t find any results matching your search parameters. Please check your spelling and try a new search. You can also try a less specific search (such as street number and name).'
const NO_RESULTS_MESSAGES = {
  address: 'There are no quotes found matching that search criteria. Please try to search again, or start a new quote.',
  policy: 'There are no policies found matching that search criteria. Please try to search again.',
  quote: DEFAULT_NO_RESULTS_MESSAGE,
  agency: DEFAULT_NO_RESULTS_MESSAGE,
  agent: DEFAULT_NO_RESULTS_MESSAGE
};

function NoResults({ searchType, error }) {
  if (error && error.message) {
    return (
      <div className="card">
        <div className="card-header"><h4><i className="fa fa-frown-o " />Error</h4></div>
        <div className="card-block">
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="result-cards">
      <div className="card">
        <div className="card-header"><h4><i className="fa fa-frown-o " /> No Results Found</h4></div>
        <div className="card-block">
          <p>{NO_RESULTS_MESSAGES[searchType]}</p>
        </div>
      </div>
    </div>
  );
}

NoResults.propTypes = {};

NoResults.defaultProps = {};

export default NoResults;
