import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Loader } from '@exzeo/core-ui';
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
    const { loading, auth, location } = this.props;
    return (
      <div className="app-wrapper csr">
        {loading &&
          <Loader />
        }
        <Helmet>
          <title>Harmony - CSR Portal</title>
        </Helmet>
        <Header auth={auth} />
        <Search pathName={location.pathname}>
          <div className="basic-footer">
            <Footer />
          </div>
        </Search>
      </div>
    );
  }
}

SearchBase.propTypes = {
  getUIQuestions: PropTypes.func,
  auth: PropTypes.object,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  loading: state.search.loading
});

export default connect(mapStateToProps, { getUIQuestions })(SearchBase);
