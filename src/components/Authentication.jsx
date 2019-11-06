import React, { Component } from 'react';
import { connect } from 'react-redux';
import { http } from '@exzeo/core-ui';

import { setUserProfile } from '../state/actions/auth.actions';
import { setAppError } from '../state/actions/error.actions';
import Auth from '../Auth';
import history from '../history';

const auth = new Auth();

// TODO: this is the first pass at abstracting out Authentication into a reusable component. Will return
export class Authentication extends Component {
  componentWillMount() {
    const {
      config,
      setAppErrorAction,
      setUserProfileAction,
      userProfile
    } = this.props;

    const { isAuthenticated } = auth;

    if (isAuthenticated() && this.checkPublicPath(window.location.pathname)) {
      this.idToken = localStorage.getItem(config.tokenLocation);
      http.defaults.headers.common.authorization = `bearer ${this.idToken}`;

      if (!userProfile) {
        try {
          const profile = JSON.parse(
            localStorage.getItem(config.profileLocation)
          );
          setUserProfileAction(profile);
        } catch (error) {
          setAppErrorAction({ message: error });
        }
      }
    } else if (
      !isAuthenticated() &&
      this.checkPublicPath(window.location.pathname)
    ) {
      history.push(config.unauthRedirect);
      http.defaults.headers.common.authorization = undefined; // eslint-disable-line
    } else if (/access_token|id_token|error/.test(window.location.hash)) {
      auth.handleAuthentication();
    }
  }

  checkPublicPath = path => {
    const { config } = this.props;
    return config.publicPaths.indexOf(path) === -1;
  };

  render() {
    auth.isAuthenticated();

    return <React.Fragment>{this.props.render({ auth })}</React.Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    userProfile: state.authState.userProfile
  };
};

export default connect(
  mapStateToProps,
  {
    setAppErrorAction: setAppError,
    setUserProfileAction: setUserProfile
  }
)(Authentication);
