import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '../context/auth-context';

import logo from '../img/Harmony.svg';

const AccessDenied = () => {
  const { error, setError } = useAuth0();
  const history = useHistory();

  return (
    <div className="route-content harmony-bg">
      <div className="modal gradient-bg">
        <div className="card access-denied error logo">
          <div className="card-header">
            <img src={logo} alt="Harmony" />
          </div>
          <div className="card-block">
            <h3>
              <i className="fa fa-exclamation-triangle" />
              &nbsp;Access Denied
            </h3>
            <p>You are not authorized to access this application.</p>
            <p className="text-danger"> {error}</p>
          </div>
          <div className="card-footer">
            <button
              className="btn btn-secondary"
              onClick={() => {
                setError();
                history.replace('/logout');
              }}
            >
              <i className="fa fa-sign-in" /> Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
