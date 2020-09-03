import React from 'react';

const SearchResultsWrapper = ({ children }) => {
  return (
    <main role="document">
      <div className="content-wrapper">
        <div className="dashboard" role="article">
          <div className="route">
            <div className="search route-content">
              <div className="survey-wrapper scroll">
                <div className="results-wrapper">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SearchResultsWrapper;
