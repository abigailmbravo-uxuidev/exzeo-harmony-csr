// src/routes.js
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Cookies } from 'react-cookie';
import Modal from 'react-modal';
import LoginPage from './containers/Login';
import SplashPage from './containers/Splash';
import AppErrorPage from './containers/AppError';
import NotFoundPage from './containers/NotFound';
import QuoteCoverage from './components/Quote/Coverage';
import QuoteUnderwriting from './components/Quote/Underwriting';
import AdditionalInterests from './components/Quote/AdditionalInterests';
import QuoteMailingAddressBilling from './components/Quote/MailingAddressBilling';
import QuoteNotesFiles from './components/Quote/NotesFiles';
import QuoteSummary from './components/Quote/Summary';
import QuoteApplication from './components/Quote/Application';
import PolicyCoverage from './components/Policy/Coverage';
import PolicyPolicyholderAgent from './components/Policy/PolicyholderAgent';
import PolicyMortgageBilling from './components/Policy/MortgageBilling';
import PolicyNotesFiles from './components/Policy/NotesFiles';
import * as errorActions from './actions/errorActions';

import * as userActions from './actions/userActions';

// this needs to be called because the AuthHOC is being called before redux init
export const validateLogin = () => {
  const cookies = new Cookies();
  const token = cookies.get('harmony-id-token');
  if (token) {
    return true;
  }
  return false;
};

const generateRedirectUrl = urlPath => `${window.location.protocol}//${window.location.host}${urlPath}`;

const  authHOC = (NavComponent, redirectUrl, props) => {
  const redirectUrlDerived = (props.user && props.user.error && props.user.accessDenied) ? `${redirectUrl}&ade=${props.user.accessDenied}` : redirectUrl;
  if (props.isAuthenticated) {
    return () => (<NavComponent {...props} />);
  }
  return () => (<LoginPage redirectUrl={generateRedirectUrl(redirectUrlDerived)} />);
};

class Routes extends Component { // eslint-disable-line
  constructor(props) {
    super(props);
    props.actions.user.validateLogin();
  }

  clearError = () => this.props.actions.errorActions.clearAppError();
  
  modalStyles = {
    content : {
      top: '20%',
      left: '20%'
    }
  };

  render() {
    return (
      <div>
        <Modal
          isOpen={ this.props.error.message !== undefined }
          contentLabel="Example Modal"
          style={ this.modalStyles }
        >
          <h2>Error</h2>
          <button onClick={this.clearError}>close</button>
          <div>{ this.props.error.message }</div>
        </Modal>

        <Router>
          <div>
            <Switch>
              <Route exact path="/" render={authHOC(SplashPage, '/', this.props)} />
              <Route exact path="/quote/billing" render={authHOC(QuoteMailingAddressBilling, '/quote/billing', this.props)} />
              <Route exact path="/quote/notes" render={authHOC(QuoteNotesFiles, '/quote/notes', this.props)} />
              <Route exact path="/quote/summary" render={authHOC(QuoteSummary, '/quote/summary', this.props)} />
              <Route exact path="/quote/additionalInterests" render={authHOC(AdditionalInterests, '/quote/additionalInterests', this.props)} />
              <Route exact path="/quote/coverage" render={authHOC(QuoteCoverage, '/quote/coverage', this.props)} />
              <Route exact path="/quote/underwriting" render={authHOC(QuoteUnderwriting, '/quote/underwriting', this.props)} />
              <Route exact path="/quote/application" render={authHOC(QuoteApplication, '/', this.props)} />
              <Route exact path="/policy/coverage" render={authHOC(PolicyCoverage, '/policy/coverage', this.props)} />
              <Route exact path="/policy/policyholder" render={authHOC(PolicyPolicyholderAgent, '/policy/policyholder', this.props)} />
              <Route exact path="/policy/billing" render={authHOC(PolicyMortgageBilling, '/policy/billing', this.props)} />
              <Route exact path="/policy/notes" render={authHOC(PolicyNotesFiles, '/policy/notes', this.props)} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/error" component={AppErrorPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  isAuthenticated: validateLogin(),
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  actions: {
    user: bindActionCreators(userActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
