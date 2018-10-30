import React from 'react';

import SearchBase from './SearchBase';

const SearchPolicy = ({ auth, location, match }) => (
  <SearchBase
    auth={auth}
    location={location}
    match={match} />
);

export default SearchPolicy;
