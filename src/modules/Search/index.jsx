import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import NewQuoteSearch from './Address';
import { SEARCH_TYPES } from '../../constants/search';

const Search = ({
  auth,
  agency,
  createQuote,
  match,
  retrieveQuote,
  userProfile
}) => {
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
    </React.Fragment>
  );
};

export default Search;
