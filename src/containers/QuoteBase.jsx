import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import QuoteHeader from '../components/Quote/QuoteHeader';
import QuoteSideNav from '../components/Quote/QuoteSideNav';
import * as userActions from '../actions/userActions';
import Footer from '../components/Common/Footer';
import NewNoteFileUploader from '../components/Common/NewNoteFileUploader';

/*
const handleLogout = (props) => {
  props.actions.user.logout();
};
*/

export const QuoteBase = props => (
  <div className="app-wrapper csr quote">
    <QuoteHeader />
    <main role="document">
      <aside className="content-panel-left">
        <div className="user">
          <label htmlFor="user">Policyholder</label>
          <h5 className="user-name">Jane Doe</h5>
        </div>
        <QuoteSideNav />
      </aside>
      <div className="content-wrapper">
          {props.children}
          <Footer />
      </div>
      <aside className="underwriting-validation">

        <h4>Underwriting Validation</h4>

      <h5 className="msg-error"><i className="fa fa-exclamation-circle" aria-hidden="true"></i> Error Messages</h5>

    <div>
        <ul>
          <li>Please enter an effective date 30 days in the past and 90 days in the future.</li><li>Please enter an effective date 30 days in the past and 90 days in the future.</li>
          <li>Please enter an effective date 30 days in the past and 90 days in the future.</li>
        </ul>
      </div>

      <h5 className="msg-caution"><i className="fa fa-exclamation-triangle" aria-hidden="true"></i> Caution Messages</h5>

    <div>
    <ul>
      <li>ZipCode is closed for this policy type.</li>
      <li>ZipCode is closed for this policy type.</li>
      <li>ZipCode is closed for this policy type.</li>
    </ul>
  </div>

    <h5 className="msg-info"><i className="fa fa-info-circle" aria-hidden="true"></i> Info Messages</h5>

<div>
      <ul>
        <li>Due to the age of the home, a 4-point inspection completed in the last 3 years is requried.</li>
        <li>Due to the age of the home, a 4-point inspection completed in the last 3 years is requried.</li>
        <li>Due to the age of the home, a 4-point inspection completed in the last 3 years is requried.</li>
      </ul>
</div>

      </aside>
      <NewNoteFileUploader />

    </main>
  </div>
);


QuoteBase.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(QuoteBase);
