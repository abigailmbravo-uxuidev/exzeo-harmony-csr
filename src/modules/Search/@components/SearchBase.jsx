import React from 'react';
import { Helmet } from 'react-helmet';
import { Route } from 'react-router-dom';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import NewQuoteSearch from '../Address';
import SearchQuote from '../Quote';
import DiariesSearch from '../Diaries';
import AgencySearch from '../Agency';
import AgentSearch from '../Agent';
import SearchPolicy from '../Policy';
import MainNavigation from '../../../components/MainNavigation';

export const SearchBase = ({
  userProfile,
  errorHandler,
  createQuote,
  retrieveQuote
}) => {
  return (
    <div className="app-wrapper csr">
      <Helmet>
        <title>Harmony - CSR Portal</title>
      </Helmet>
      <Header>
        <MainNavigation />
      </Header>
      <Route
        exact
        path="/address"
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
        path="/quote"
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
        path="/diaries"
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
        path="/agency"
        render={props => <AgencySearch {...props} userProfile={userProfile} />}
      />
      <Route
        exact
        path="/agent"
        render={props => <AgentSearch {...props} userProfile={userProfile} />}
      />

      <Route
        exact
        path="/"
        render={props => <SearchPolicy {...props} userProfile={userProfile} />}
      />
      <div className="basic-footer">
        <Footer />
      </div>
    </div>
  );
};
export default SearchBase;
