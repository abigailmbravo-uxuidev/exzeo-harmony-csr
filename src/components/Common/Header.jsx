import React from 'react';

import logo from '../../img/Harmony.svg';

const handleLogout = (auth) => {
  auth.logout();
};

const getUsername = (auth) => {
  const { userProfile } = auth;
  if (userProfile) {
    return userProfile.name;
  }
  return '';
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
        <a href="" className="active">Policy Management</a>
        { /* <a href="">Agency Management</a>
        <a href="">User Management</a> */ }
        <div className="user-name">{ getUsername(props.auth) }</div>
        <button className="btn btn-action"><i className="fa fa-gear" /></button>
        <button className="btn logout btn-action" type="button" onClick={() => handleLogout(props.auth)}><i className="fa fa-sign-out" /></button>
      </nav>
    </div>
  </header>
);

export default Header;
