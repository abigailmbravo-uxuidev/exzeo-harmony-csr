import React from 'react';
import { Route } from 'react-router-dom';
import NewQuoteSearch from './Address';
import SearchPolicy from './Policy';
import SearchQuote from './Quote';

const Search = ({ auth, agency, createQuote, retrieveQuote, userProfile }) => {
  return (
    <React.Fragment>
      <Route
        exact
        path={`/address`}
        render={props => (
          <NewQuoteSearch
            {...props}
            createQuote={createQuote}
            userProfile={userProfile}
          />
        )}
      />
      <Route
        exact
        path={`/quote`}
        render={props => (
          <SearchQuote
            {...props}
            retrieveQuote={retrieveQuote}
            userProfile={userProfile}
          />
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
        render={props => <SearchPolicy {...props} userProfile={userProfile} />}
      />
    </React.Fragment>
  );
};

export default Search;
