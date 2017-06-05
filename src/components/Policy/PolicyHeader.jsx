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
      <a href="/" id="logo" className="logo">
        <img src={logo} alt="Harmony" />
      </a>
      {/*<nav>
        <div>
                <button className="btn close btn-action" type="button"><i className="fa fa-times" /></button>
        </div>
      </nav>*/}
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
