import React from 'react';
import { Route } from 'react-router-dom';
import NewQuoteSearch from './Address';
import SearchPolicy from './Policy';
import SearchQuote from './Quote';
import DiariesSearch from './Diaries/DiariesSearch';
import AgencySearch from './Agency';
import AgentSearch from './Agent';

const Search = ({ createQuote, retrieveQuote, userProfile, errorHandler }) => {
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
          <DiariesSearch
            {...props}
            userProfile={userProfile}
            errorHandler={errorHandler}
          />
        )}
      />
      <Route
        exact
        path={`/agency`}
        render={props => <AgencySearch {...props} userProfile={userProfile} />}
      />
      <Route
        exact
        path={`/agent`}
        render={props => <AgentSearch {...props} />}
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
