import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Helmet } from 'react-helmet';
import QuoteHeader from '../components/Quote/QuoteHeader';
import QuoteSideNav from '../components/Quote/QuoteSideNav';
import DetailHeader from '../components/Quote/DetailHeader';
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
    {/*TODO: dynamically add quote # to title*/}
    <Helmet><title>Policy 12-123456</title></Helmet>
    <NewNoteFileUploader/>
    <QuoteHeader/>
    <main role="document">
      <aside className="content-panel-left">
        <div className="user">
          <label htmlFor="user">Policyholder</label>
          <p className="user-name">Jane Doe</p>
        </div>
        <QuoteSideNav/>
      </aside>
      <div className="content-wrapper">
        <DetailHeader />
        {props.children}
        <Footer/>
      </div>
      <aside className="underwriting-validation">

        <h4>Underwriting Validation</h4>

      <section className="msg-error">
        <h5>
          <i className="fa fa-exclamation-circle" aria-hidden="true"></i>&nbsp;Error Messages</h5>

        <div>
          <ul className="fa-ul">
            <li><i className="fa-li fa fa-exclamation-circle" aria-hidden="true"></i>Please enter an effective date 30 days in the past and 90 days in the future.</li>
            <li><i className="fa-li fa fa-exclamation-circle" aria-hidden="true"></i>Please enter an effective date 30 days in the past and 90 days in the future.</li>
            <li><i className="fa-li fa fa-exclamation-circle" aria-hidden="true"></i>Please enter an effective date 30 days in the past and 90 days in the future.</li>
          </ul>
        </div>
        </section>

        <section className="msg-caution">
        <h5>
          <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>&nbsp;Caution Messages</h5>

        <div>
          <ul className="fa-ul">
            <li><i className="fa-li fa fa-exclamation-triangle" aria-hidden="true"></i>ZipCode is closed for this policy type.</li>
            <li><i className="fa-li fa fa-exclamation-triangle" aria-hidden="true"></i>ZipCode is closed for this policy type.</li>
            <li><i className="fa-li fa fa-exclamation-triangle" aria-hidden="true"></i>ZipCode is closed for this policy type.</li>
          </ul>
        </div>

        </section>

        <section className="msg-info">

        <h5>
          <i className="fa fa-info-circle" aria-hidden="true"></i>&nbsp;Info Messages</h5>

        <div>
          <ul className="fa-ul">
            <li><i className="fa-li fa fa-info-circle" aria-hidden="true"></i>Due to the age of the home, a 4-point inspection completed in the last 3 years is requried.</li>
            <li><i className="fa-li fa fa-info-circle" aria-hidden="true"></i>Due to the age of the home, a 4-point inspection completed in the last 3 years is requried.</li>
            <li><i className="fa-li fa fa-info-circle" aria-hidden="true"></i>Due to the age of the home, a 4-point inspection completed in the last 3 years is requried.</li>
          </ul>
        </div>

        </section>

      </aside>

    </main>
  </div>
);

QuoteBase.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

const mapStateToProps = state => ({user: state.user});
const mapDispatchToProps = dispatch => ({
  actions: {
    user: bindActionCreators(userActions, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(QuoteBase);
