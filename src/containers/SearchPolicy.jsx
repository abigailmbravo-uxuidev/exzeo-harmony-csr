import React from 'react';

import SearchBase from './SearchBase';

const SearchPolicy = ({ handleLogout, location, match }) => (
  <SearchBase handleLogout={handleLogout} location={location} match={match} />
);

export default SearchPolicy;
