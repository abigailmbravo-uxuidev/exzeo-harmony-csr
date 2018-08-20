import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Loader } from '@exzeo/core-ui';
import { WORK_FLOW_DATA, WORK_FLOW_MODEL_NAME } from "../constants/search";
import { startWorkflow } from '../state/actions/cgActions';
import { getUIQuestions } from '../state/actions/questionsActions';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import Search from '../modules/Search';

export class SearchBase extends Component {
  componentDidMount() {
    const { startWorkflow, getUIQuestions } = this.props;
    startWorkflow(WORK_FLOW_MODEL_NAME, WORK_FLOW_DATA);
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
  startWorkflow: PropTypes.func,
  auth: PropTypes.object,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  loading: state.search.loading
});

export default connect(mapStateToProps, {
  getUIQuestions,
  startWorkflow
})(SearchBase);
