import React from 'react';

import SearchBase from './SearchBase';

const SearchPolicy = ({
  handleLogout,
  location,
  match,
  errorHandler,
  userProfile,
  auth
}) => (
  <SearchBase
    auth={auth}
    userProfile={userProfile}
    handleLogout={handleLogout}
    location={location}
    match={match}
    errorHandler={errorHandler}
  />
);

export default SearchPolicy;
