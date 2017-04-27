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
      <aside className="underwriting-validation">test</aside>
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
