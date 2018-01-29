import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import logo from '../../img/Harmony.svg';

const handleLogout = (auth) => {
  auth.logout();
};

const Header = props => (
  <header>
    <div role="banner">
      <button className="btn-icon btn-bars"><i className="fa fa-bars" /></button>
      <a href="/" id="logo" className="logo">
        <img src={logo} alt="Harmony" />
      </a>
      <button className="btn-icon btn-ellipsis-v"><i className="fa fa-ellipsis-v" /></button>
      <nav className="fade-in">
        <a href="" className="active">Policy</a>
        { /* <a href="">User Management</a> */ }
        <div className="user-name">{ props.authState && props.authState.userProfile ? props.authState.userProfile.name : ''}</div>
        <button tabIndex={'0'} className="btn btn-action"><i className="fa fa-gear" /></button>
        <button tabIndex={'0'} className="btn logout btn-action" type="button" onClick={() => handleLogout(props.auth)}><i className="fa fa-sign-out" /></button>
      </nav>
    </div>
  </header>
);

Header.propTypes = {
  authState: PropTypes.shape({
    userProfile: PropTypes.object
  })
};

const mapStateToProps = state => ({
  authState: state.authState
});

export default connect(mapStateToProps)(Header);
