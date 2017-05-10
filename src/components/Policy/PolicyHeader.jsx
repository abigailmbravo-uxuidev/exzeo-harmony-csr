import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import logo from '../../img/Harmony.svg';
import * as userActions from '../../actions/userActions';

export const PolicyHeader = props => (
  <header>
    <div role="banner">
      <div className="tab-tag">
              <button className="btn-icon btn-bars"><i className="fa fa-bars" /></button>
              <span>POLICY</span>
      </div>
      <div id="logo" className="logo">
        <img src={logo} alt="Harmony" />
      </div>
      <div className="policy-description"><label>Type</label>HO3 Homeowners<label>Quote Number</label>12-123456-01</div>
      <button className="btn-icon btn-ellipsis-v"><i className="fa fa-ellipsis-v" /></button>
      <nav>
        <div></div>
        <button className="btn close btn-action" type="button"><i className="fa fa-times" /></button>
      </nav>
    </div>
  </header>
);




PolicyHeader.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(PolicyHeader);
