import React, { Component } from 'react';

import history from '../history';
import Loader from '../components/Common/Loader';

class Login extends Component {
  constructor(props) {
    super(props);
    const { isAuthenticated } = props.auth;
    if (!isAuthenticated()) {
      props.auth.login();
    } else {
      history.push('/');
    }
  }
  render() {
    return (<Loader />);
  }
}

export default Login;
