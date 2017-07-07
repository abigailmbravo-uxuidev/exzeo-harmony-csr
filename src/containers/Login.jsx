import React, { Component } from 'react';

import history from '../history';
import Loader from '../components/Common/Loader';

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
    return (<Loader />);
  }
}

export default Login;
