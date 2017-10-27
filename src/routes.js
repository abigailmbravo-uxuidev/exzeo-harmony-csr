// src/routes.js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import Modal from 'react-modal';
import ConfirmPopup from './components/Common/ConfirmPopup';
import history from './history';
import Auth from './Auth';
import LoginPage from './containers/Login';
import AccessDenied from './containers/AccessDenied';
import LoggedOut from './containers/LoggedOut';
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
import PolicyEndorsements from './components/Policy/Endorsements';
import * as appStateActions from './actions/appStateActions';
import PolicyCancel from './components/Policy/Cancel';
import * as errorActions from './actions/errorActions';
import * as authActions from './actions/authActions';

const auth = new Auth();

// logout the user if the server comesback with a 401
axios.interceptors.response.use(response => response,
  (error) => {
    if (error.response.status === 401) {
      auth.logout();
    }
    return Promise.reject(error);
  });

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

const checkPublicPath = (path) => {
  const publicPaths = ['/login', '/logout', '/error', '/accessDenied', '/loggedOut', '/callback'];
  return (publicPaths.indexOf(path) === -1);
};

class Routes extends Component {
  constructor(props) {
    super(props);

    const { isAuthenticated } = auth;
    if (isAuthenticated() && checkPublicPath(window.location.pathname)) {
      const idToken = localStorage.getItem('id_token');
      axios.defaults.headers.common['authorization'] = `bearer ${idToken}`; // eslint-disable-line
      
      if (!props.authState.userProfile) {
        const profile = JSON.parse(localStorage.getItem('user_profile'));
        console.log('dispatchUserProfile', profile)
        props.actions.authActions.dispatchUserProfile(profile);
      }
      
    } else if (!isAuthenticated() && checkPublicPath(window.location.pathname)) {
      history.push('/login');
      axios.defaults.headers.common['authorization'] = undefined; // eslint-disable-line
    }
  }

  setBackStep = (goToNext, callback) => {
    this.props.actions.appStateActions.setAppState(this.props.appState.modelName, this.props.appState.instanceId, {
      ...this.props.appState.data,
      activateRedirect: false
    });
    callback(goToNext);
  };

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
          style={this.modalStyles}
          className="card"
        >
          <div className="card-header"><h4><i className="fa fa-exclamation-circle" />&nbsp;Error</h4></div>
          <div className="card-block">{ this.props.error.message }</div>
          <div className="card-footer"><button className="btn-primary" onClick={this.clearError}>close</button></div>

        </Modal>
        <Router
          getUserConfirmation={(message, callback) => {
            ReactDOM.render((
              <ConfirmPopup {...this.props} message={message} setBackStep={this.setBackStep} callback={callback} />
      ), document.getElementById('modal'));
          }}
        >
          <div className="routes">
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
              <Route exact path="/policy/cancel" render={props => <PolicyCancel auth={auth} {...props} />} />
              <Route exact path="/policy/endorsements" render={props => <PolicyEndorsements auth={auth} {...props} />} />
              <Route exact path="/login" render={props => <LoginPage auth={auth} {...props} />} />
              <Route exact path="/error" render={props => <AppErrorPage auth={auth} {...props} />} />
              <Route exact path="/accessDenied" render={props => <AccessDenied auth={auth} {...props} />} />
              <Route exact path="/loggedOut" render={props => <LoggedOut auth={auth} {...props} />} />
              <Route
                exact
                path="/logout"
                render={() => {
                  auth.logout();
                  return <Callback />;
                }}
              />
              <Route
                exact
                path="/callback"
                render={(props) => {
                  handleAuthentication(props);
                  return <Callback />;
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
  error: state.error,
  appState: state.appState,
  authState: state.authState
});

const mapDispatchToProps = dispatch => ({
  actions: {
    appStateActions: bindActionCreators(appStateActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
