// src/routes.js
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Cookies } from 'react-cookie';

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
import PolicyCoverage from './components/Policy/Coverage';
import PolicyPolicyholderAgent from './components/Policy/PolicyholderAgent';
import PolicyMortgageBilling from './components/Policy/MortgageBilling';
import PolicyNotesFiles from './components/Policy/NotesFiles';

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

// A higher order component that allows for checking the routes authentication prefs.
function authHOC(NavComponent, redirectUrl, props) {
  return class AuthHOC extends React.Component { // eslint-disable-line
    render() {
      if (props.isAuthenticated) {
        return <NavComponent {...props} />;
      }
      return <LoginPage redirectUrl={generateRedirectUrl(redirectUrl)} />;
    }
  };
}

class Routes extends Component { // eslint-disable-line
  constructor(props) {
    super(props);
    props.actions.user.validateLogin();
  }
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={authHOC(SplashPage, '/', this.props)} />
            <Route exact path="/quote/billing" component={authHOC(QuoteMailingAddressBilling, '/quote/billing', this.props)} />
            <Route exact path="/quote/notes" component={authHOC(QuoteNotesFiles, '/quote/notes', this.props)} />
            <Route exact path="/quote/summary" component={authHOC(QuoteSummary, '/quote/summary', this.props)} />
            <Route exact path="/quote/additionalInterests" component={authHOC(AdditionalInterests, '/quote/additionalInterests', this.props)} />
            <Route exact path="/quote/coverage" component={authHOC(QuoteCoverage, '/quote/coverage', this.props)} />
            <Route exact path="/quote/underwriting" component={authHOC(QuoteUnderwriting, '/quote/underwriting', this.props)} />
            <Route exact path="/policy/coverage" component={authHOC(PolicyCoverage, '/policy/coverage', this.props)} />
            <Route exact path="/policy/policyholder" component={authHOC(PolicyPolicyholderAgent, '/policy/policyholder', this.props)} />
            <Route exact path="/policy/billing" component={authHOC(PolicyMortgageBilling, '/policy/billing', this.props)} />
            <Route exact path="/policy/notes" component={authHOC(PolicyNotesFiles, '/policy/notes', this.props)} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/error" component={AppErrorPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  isAuthenticated: validateLogin()
});

const mapDispatchToProps = dispatch => ({
  actions: {
    user: bindActionCreators(userActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
