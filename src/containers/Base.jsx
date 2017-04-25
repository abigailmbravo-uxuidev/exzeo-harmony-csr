import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from '../components/Common/Header';
import SideNav from '../components/Common/SideNav';
import * as userActions from '../actions/userActions';

const handleLogout = (props) => {
  props.actions.user.logout();
};

export const Base = props => (
  <div className="app-wrapper csr">
    <Header />
    <main role="document">
      <aside className="content-panel-left">
        <div className="csr">
          <h3>CSR Portal</h3>
        </div>
        <SideNav />
        <button className="btn logout btn-action" type="button" onClick={() => handleLogout(props)}>
          <div>
            <i className="fa fa-sign-out" />
            <span>Logout</span>
          </div>
        </button>
      </aside>
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
