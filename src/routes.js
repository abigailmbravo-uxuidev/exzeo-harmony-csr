// src/routes.js
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Login from './containers/Login';
import Splash from './containers/Splash';
import AppError from './containers/AppError';
import NotFound from './containers/NotFound';
import Coverage from './containers/Coverage';
import PolicyCoverage from './containers/PolicyCoverage';

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
          <Helmet><title>Harmony - CSR Portal</title></Helmet>
          <Switch>
            <Route exact path="/" component={authHOC(Splash, '/', this.props)} />
            <Route exact path="/quote" component={Coverage} />
            <Route exact path="/policy" component={PolicyCoverage} />
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
