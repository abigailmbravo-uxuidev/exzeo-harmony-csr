import React from 'react';
import { Helmet } from 'react-helmet';

import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import Search from '../modules/Search';

export const SearchBase = ({
  handleLogout,
  location,
  userProfile,
  errorHandler,
  match
}) => {
  return (
    <div className="app-wrapper csr">
      <Helmet>
        <title>Harmony - CSR Portal</title>
      </Helmet>
      <Header handleLogout={handleLogout} />
      <Search
        match={match}
        pathName={location.pathname}
        userProfile={userProfile}
        errorHandler={errorHandler}
      >
        <div className="basic-footer">
          <Footer />
        </div>
      </Search>
    </div>
  );
};
export default SearchBase;
