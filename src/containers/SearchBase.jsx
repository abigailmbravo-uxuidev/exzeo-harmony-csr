import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { emptyArray } from '@exzeo/core-ui';

import { getUIQuestions } from '../state/actions/questions.actions';

import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import Search from '../modules/Search';
import { setAppError } from '../state/actions/error.actions';

export const SearchBase = ({
  handleLogout,
  location,
  userProfile,
  errorHandler
}) => {
  return (
    <div className="app-wrapper csr">
      <Helmet>
        <title>Harmony - CSR Portal</title>
      </Helmet>
      <Header handleLogout={handleLogout} />
      <Search
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
