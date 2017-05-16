import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import logo from '../../img/Harmony.svg';
import * as userActions from '../../actions/userActions';

const handleLogout = (props) => {
  console.log('logout', props);
  props.actions.user.logout();
};

const getUsername = props => (props.user.profile) ? props.user.profile.username : '';

export const Header = props => (
  <header>
    <div role="banner">
      <button className="btn-icon btn-bars"><i className="fa fa-bars" /></button>
      <div id="logo" className="logo">
        <img src={logo} alt="Harmony" />
      </div>
      <button className="btn-icon btn-ellipsis-v"><i className="fa fa-ellipsis-v" /></button>
      <nav className="fade-in">
        <a href="" className="active">Policy Management</a>
        { /* <a href="">Agency Management</a>
        <a href="">User Management</a> */ }
        <div className="user-name">{ getUsername(props) }</div>
        <button className="btn btn-action"><i className="fa fa-gear" /></button>
        <button className="btn logout btn-action" type="button" onClick={() => handleLogout(props)}><i className="fa fa-sign-out" /></button>
      </nav>
    </div>
  </header>
);

Header.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  actions: {
    user: bindActionCreators(userActions, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
