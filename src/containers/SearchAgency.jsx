import React from 'react';
import SearchBase from './SearchBase';

const SearchAgency = ({ auth, location, match }) => {
  return (
    <SearchBase auth={auth} location={location} match={match} />
  );
};

export default SearchAgency;
