import React, { PropTypes } from 'react';

export const Login = props => (<div>{ window.location.assign(`${process.env.REACT_APP_LOGIN_URL}?redirectUrl=${props.redirectUrl}`) }</div>);

Login.propTypes = {
  redirectUrl: PropTypes.string
};

export default Login;
