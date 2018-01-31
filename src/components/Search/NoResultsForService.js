import React from 'react';


const NoResults = () => (
  <div className="result-cards">
    <div className="card">
      <div className="card-header"><h4><i className="fa fa-frown-o " /> No Results Found</h4></div>
      <div className="card-block">
        {
              (<p>We&#39;re sorry we couldn&#39;t find any results matching your search parameters. Please
                  check your spelling and try a new search. You can also try a
                  less specific search (such as street number and name).</p>
              )
            }
      </div>
    </div>
  </div>
  );

export default NoResults;
