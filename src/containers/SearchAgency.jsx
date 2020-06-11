import React from 'react';
import SearchBase from './SearchBase';

const SearchAgency = ({ auth, location, match, errorHandler }) => (
  <SearchBase
    auth={auth}
    location={location}
    match={match}
    errorHandler={errorHandler}
  />
);

export default SearchAgency;
