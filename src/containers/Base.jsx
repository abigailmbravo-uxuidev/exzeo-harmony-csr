import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from '../components/Common/Header';
import SideNav from '../components/Common/SideNav';
import * as userActions from '../actions/userActions';
import SearchBar from '../components/Search/SearchBar';

/*
const handleLogout = (props) => {
  props.actions.user.logout();
};
*/

export const Base = props => (
  <div className="app-wrapper csr">
    <Header />
    <div className="search ">
      { props.user && props.user.isAuthenticated && <SearchBar /> }
    </div>
    <main role="document">
      <div className="content-wrapper">
        {props.children}
      </div>
    </main>
  </div>
);

Base.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(Base);
