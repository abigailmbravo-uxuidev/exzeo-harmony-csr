// src/routes.js
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Cookies } from 'react-cookie';

import Login from './containers/Login';
import Splash from './containers/Splash';
import AppError from './containers/AppError';
import NotFound from './containers/NotFound';
import QuoteCoverage from './components/Quote/Coverage';
import QuoteUnderwriting from './components/Quote/Underwriting';
import QuoteMailingAddressBilling from './components/Quote/MailingAddressBilling';
import QuoteNotesFiles from './components/Quote/NotesFiles';
import QuoteSummary from './components/Quote/Summary';
import PolicyCoverage from './components/Policy/Coverage';
import PolicyPolicyholderAgent from './components/Policy/PolicyholderAgent';
import PolicyMortgageBilling from './components/Policy/MortgageBilling';
import PolicyNotesFiles from './components/Policy/NotesFiles';

import * as userActions from './actions/userActions';

export const validateLogin = () => {
  const cookies = new Cookies();
  const token = cookies.get('harmony-id-token');
  if (token) {
    const user = { token, isAuthenticated: true, loggedOut: false };
    console.log('user', user);
    return true;
  }
  return false;
};

// A higher order component that allows for checking the routes authentication prefs.
function authHOC(NavComponent, redirectUrl, props) {
  return class AuthHOC extends React.Component { // eslint-disable-line
    render() {
      if (props.isAuthenticated) {
        return <NavComponent {...props} />;
      }
      return <Login redirectUrl={redirectUrl} />;
    }
  };
}

class Routes extends Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.props.actions.user.validateLogin();
  }
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={authHOC(Splash, `http://${window.location.host}/`, this.props)} />
            <Route exact path="/quote/billing" component={authHOC(QuoteMailingAddressBilling, `http://${window.location.host}/`, this.props)} />
            <Route exact path="/quote/notes" component={QuoteNotesFiles} />
            <Route exact path="/quote/summary" component={QuoteSummary} />
            <Route exact path="/quote/coverage" component={authHOC(QuoteCoverage, `http://${window.location.host}/`, this.props)} />
            <Route exact path="/quote/underwriting" component={authHOC(QuoteUnderwriting, `http://${window.location.host}/`, this.props)} />
            <Route exact path="/policy/coverage" component={PolicyCoverage} />
            <Route exact path="/policy/policyholder" component={PolicyPolicyholderAgent} />
            <Route exact path="/policy/billing" component={PolicyMortgageBilling} />
            <Route exact path="/policy/notes" component={PolicyNotesFiles} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/error" component={AppError} />
            <Route component={NotFound} />
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
