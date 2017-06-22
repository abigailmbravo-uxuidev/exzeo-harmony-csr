// src/routes.js
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import history from './history';
import Auth from './Auth';
import LoginPage from './containers/Login';
import AccessDenied from './containers/AccessDenied';
import Callback from './containers/Callback';
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

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

const checkPublicPath = (path) => {
  const publicPaths = ['/login', '/logout', '/error', '/accessDenied', '/callback'];
  return (publicPaths.indexOf(path) === -1);
};

class Routes extends Component {
  componentWillMount() {
    const { isAuthenticated, userProfile, getProfile } = auth;
    if (isAuthenticated() && !userProfile && checkPublicPath(window.location.pathname)) {
      getProfile((err, profile) => {
        console.log('profile loaded:', profile);
        if (!auth.checkIfCSRGroup()) {
          history.push('/accessDenied?error=Please login with the proper credentials.');
        }
      });
    } else if (!isAuthenticated() && checkPublicPath(window.location.pathname)) {
      history.push('/login');
    }
  }
  clearError = () => this.props.actions.errorActions.clearAppError();
  modalStyles = {
    content: {
      top: '20%',
      left: '20%'
    }
  };
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.error.message !== undefined}
          contentLabel="Example Modal"
          style={ this.modalStyles }
          className="card"
        >
          <div className="card-header"><h4><i className="fa fa-exclamation-circle"></i>&nbsp;Error</h4></div>
          <div className="card-block">{ this.props.error.message }</div>
          <div className="card-footer"><button className="btn-primary" onClick={this.clearError}>close</button></div>

        </Modal>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" render={props => <SplashPage auth={auth} {...props} />} />
              <Route exact path="/quote/billing" render={props => <QuoteMailingAddressBilling auth={auth} {...props} />} />
              <Route exact path="/quote/notes" render={props => <QuoteNotesFiles auth={auth} {...props} />} />
              <Route exact path="/quote/summary" render={props => <QuoteSummary auth={auth} {...props} />} />
              <Route exact path="/quote/additionalInterests" render={props => <AdditionalInterests auth={auth} {...props} />} />
              <Route exact path="/quote/coverage" render={props => <QuoteCoverage auth={auth} {...props} />} />
              <Route exact path="/quote/underwriting" render={props => <QuoteUnderwriting auth={auth} {...props} />} />
              <Route exact path="/quote/application" render={props => <QuoteApplication auth={auth} {...props} />} />
              <Route exact path="/policy/coverage" render={props => <PolicyCoverage auth={auth} {...props} />} />
              <Route exact path="/policy/policyholder" render={props => <PolicyPolicyholderAgent auth={auth} {...props} />} />
              <Route exact path="/policy/billing" render={props => <PolicyMortgageBilling auth={auth} {...props} />} />
              <Route exact path="/policy/notes" render={props => <PolicyNotesFiles auth={auth} {...props} />} />
              <Route exact path="/login" render={props => <LoginPage auth={auth} {...props} />} />
              <Route exact path="/error" render={props => <AppErrorPage auth={auth} {...props} />} />
              <Route exact path="/accessDenied" render={props => <AccessDenied auth={auth} {...props} />} />
              <Route
                exact
                path="/logout"
                render={() => {
                  auth.logout();
                  return <span />;
                }}
              />
              <Route
                exact
                path="/callback"
                render={(props) => {
                  handleAuthentication(props);
                  return <Callback {...props} />;
                }}
              />
              <Route path="*" render={props => <NotFoundPage auth={auth} {...props} />} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  actions: {
    errorActions: bindActionCreators(errorActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
