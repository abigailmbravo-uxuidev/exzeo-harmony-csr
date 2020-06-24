import React from 'react';
import { Route } from 'react-router-dom';

const Search = ({
  auth,
  agency,
  createQuote,
  match,
  retrieveQuote,
  userProfile
}) => {
  return (
    <div className="route">
      <div className="flex grow">
        <div className="search route-content">
          <Route
            exact
            path={`/address`}
            render={props => (
              // <SearchAddress
              //   {...props}
              //   createQuote={createQuote}
              //   userProfile={userProfile}
              // />
              <div>SearchAddress</div>
            )}
          />
          <Route
            exact
            path={`/quote`}
            render={props => (
              // <SearchQuote
              //   {...props}
              //   retrieveQuote={retrieveQuote}
              //   userProfile={userProfile}
              // />
              <div>SearchQuote</div>
            )}
          />
          <Route
            exact
            path={`/diaries`}
            render={props => (
              // <SearchAddress
              //   {...props}
              //   createQuote={createQuote}
              //   userProfile={userProfile}
              // />
              <div>Diaries</div>
            )}
          />
          <Route
            exact
            path={`/agency`}
            render={props => (
              // <SearchAddress
              //   {...props}
              //   createQuote={createQuote}
              //   userProfile={userProfile}
              // />
              <div>Agency</div>
            )}
          />
          <Route
            exact
            path={`/`}
            render={props => (
              // <SearchPolicy {...props} userProfile={userProfile} />
              <div>SearchPolicy</div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
