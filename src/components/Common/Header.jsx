import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../img/Harmony.svg';

const handleLogout = (auth) => {
  auth.logout();
};

const Header = props => (
  <header>
    <div role="banner">
      <button className="btn-icon btn-bars"><i className="fa fa-bars" /></button>
      <Link to="/" id="logo" className="logo"><img src={logo} alt="Harmony" /></Link>
      <button className="btn-icon btn-ellipsis-v"><i className="fa fa-ellipsis-v" /></button>
      <nav className="fade-in">
        <NavLink to="/reports" activeClassName="active" exact>Reports</NavLink>
        <NavLink to="/agency" activeClassName="active" exact>Agency</NavLink>
        <NavLink to="/" activeClassName="active" exact>Policy</NavLink>
        {/* <a href="">User Management</a> */}
        <div className="user-name">{props.authState && props.authState.userProfile ? props.authState.userProfile.userName : ''}</div>
        <button tabIndex="0" className="btn btn-action"><i className="fa fa-gear" /></button>
        <button tabIndex="0" className="btn logout btn-action" type="button" onClick={() => handleLogout(props.auth)}><i className="fa fa-sign-out" /></button>
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
