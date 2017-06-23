import React from 'react';
import * as queryString from 'query-string';

const parsed = queryString.parse(window.location.search);

const AccessDenied = props => (<div className="route-content">
  <h2>Access Denied</h2>
  <div>
    <p>You are not authorized to access this application.</p>
    <p className="text-danger"><i className="fa fa-exclamation-triangle" /> {parsed.error}</p>
    <button onClick={() => props.auth.logout()}><i className="fa fa-sign-in" /> Login</button>
  </div>
</div>);

export default AccessDenied;
