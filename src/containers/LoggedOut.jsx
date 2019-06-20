import React from 'react';
import logo from '../img/Harmony.svg';

const LoggedOut = props => (
  <div className="route-content harmony-bg">
    <div className="modal gradient-bg">
      <div className="card logged-out logo scale-in-center">
        <div className="card-header">
          <img src={logo} alt="Harmony" />
        </div>
        <div className="card-block">
          <h3>
            <i className="fa fa-sign-out" />
            &nbsp;Signed Out
          </h3>
          <p>You have been signed out.</p>
        </div>
        <div className="card-footer">
          <button
            className="btn btn-secondary"
            onClick={() => props.auth.login()}
          >
            <i className="fa fa-sign-in" />
            Login
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default LoggedOut;
