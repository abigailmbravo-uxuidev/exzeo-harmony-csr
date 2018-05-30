import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { startWorkflow } from '../actions/cgActions';
import { getUIQuestions } from '../actions/questionsActions';
import Loader from '../components/Common/Loader';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import Search from '../components/Search';


const workflowModelName = 'csrQuote';
const workflowData = {
  dsUrl: `${process.env.REACT_APP_API_URL}/ds`
};

export class Splash extends Component {
  componentDidMount() {
    const { startWorkflow, getUIQuestions } = this.props;
    startWorkflow(workflowModelName, workflowData);
    getUIQuestions('searchCSR');
  }

  render() {
    const { appState, auth } = this.props;
    return (
      <div className="app-wrapper csr">
        {appState.loading && <Loader />}
        <Helmet>
          <title>Harmony - CSR Portal</title>
        </Helmet>
        <Header auth={auth} />
        <Search>
          <div className="basic-footer">
            <Footer />
          </div>
        </Search>
      </div>
    );
  }
}

Splash.contextTypes = {
  router: PropTypes.object
};

Splash.propTypes = {
  getUIQuestions: PropTypes.func,
  startWorkflow: PropTypes.func
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  error: state.error
});

export default connect(mapStateToProps, {
  getUIQuestions,
  startWorkflow
})(Splash);
