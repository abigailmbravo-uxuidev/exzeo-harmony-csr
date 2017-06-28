import React from 'react';
import * as queryString from 'query-string';
import logo from '../img/Harmony.svg';

const parsed = queryString.parse(window.location.search);

const LoggedOut = props => (<div className="route-content">
  <div className="modal">
    <div className="card logo">
      <div className="card-header">
          <img src={logo} alt="Harmony" />
      </div>
      <div className="card-block">
        <h3><i className="fa fa-sign-out" />&nbsp;Signed Out</h3>
        <p>You have been signed out.</p>
      </div>
      <div className="card-footer">
        <button className="btn btn-secondary" onClick={() => props.auth.login()}><i className="fa fa-sign-in" /> Login</button>
      </div>
    </div>
  </div>
</div>);

export default LoggedOut;
