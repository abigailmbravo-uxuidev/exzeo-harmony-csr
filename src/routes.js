// src/routes.js
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './containers/Login';
import Splash from './containers/Splash';
import AppError from './containers/AppError';
import NotFound from './containers/NotFound';
import QuoteCoverage from './components/Quote/Coverage';
import PolicyCoverage from './components/Policy/Coverage';
import PolicyholderAgent from './components/Policy/PolicyholderAgent';

// A higher order component that allows for checking the routes authentication prefs.
function authHOC(NavComponent, redirectUrl, props) {
  return class AuthHOC extends React.Component { // eslint-disable-line
    render() {
      if (props.user.isAuthenticated) {
        return <NavComponent {...props} />;
      }
      return <Login redirectUrl={redirectUrl} />;
    }
  };
}

class Routes extends Component { // eslint-disable-line
  render() {
    return (
      <Router>
        <div>
          
          <Switch>
            <Route exact path="/" component={authHOC(Splash, '/', this.props)} />
            <Route exact path="/quote" component={QuoteCoverage} />
            <Route exact path="/policy" component={PolicyholderAgent} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/error" component={AppError} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps)(Routes);
