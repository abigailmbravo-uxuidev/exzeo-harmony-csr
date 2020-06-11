import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { emptyArray } from '@exzeo/core-ui';

import { getUIQuestions } from '../state/actions/questions.actions';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import Search from '../modules/Search';

export class SearchBase extends Component {
  componentDidMount() {
    const { getUIQuestions } = this.props;
    getUIQuestions('searchCSR');
  }

  render() {
    const { handleLogout, location, userProfile } = this.props;

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
  }
}

SearchBase.propTypes = {
  auth: PropTypes.shape().isRequired,
  loading: PropTypes.bool.isRequired,
  location: PropTypes.shape().isRequired,
  getUIQuestions: PropTypes.func.isRequired,
  userProfile: PropTypes.shape().isRequired
};

const stubProfile = { profile: {} };
const mapStateToProps = state => ({
  loading: state.search.loading,
  userProfile: state.authState.userProfile || stubProfile,
  agencies: state.service.agencies || emptyArray
});

export default connect(mapStateToProps, {
  getUIQuestions
})(SearchBase);
