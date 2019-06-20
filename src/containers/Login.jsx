import React, { Component } from 'react';
import { Loader } from '@exzeo/core-ui';

import history from '../history';

class Login extends Component {
  componentDidMount() {
    const { isAuthenticated } = this.props.auth;
    if (!isAuthenticated()) {
      this.props.auth.login();
    } else {
      history.push('/');
    }
  }
  render() {
    return <Loader />;
  }
}

export default Login;
