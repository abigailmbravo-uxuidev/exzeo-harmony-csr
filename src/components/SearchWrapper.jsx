import React from 'react';
import { Helmet } from 'react-helmet';
import Header from './Common/Header';
import Search from '../modules/Search';
import Footer from './Common/Footer';

const SearchWrapper = () => {
  return (
    <div className="app-wrapper csr">
      <Helmet>
        <title>Harmony - CSR Portal</title>
      </Helmet>
      <Header handleLogout={handleLogout} />
      <Search pathName={location.pathname} userProfile={userProfile}>
        <div className="basic-footer">
          <Footer />
        </div>
      </Search>
    </div>
  );
};

export default SearchWrapper;
