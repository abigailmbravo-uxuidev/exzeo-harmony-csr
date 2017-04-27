import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import QuoteHeader from '../components/Quote/QuoteHeader';
import SideNav from '../components/Common/SideNav';
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
        <div className="csr">
          <h3>CSR Portal for Quote</h3>
        </div>
        <SideNav />
      </aside>
      <div className="content-wrapper">
        {props.children}
        <aside>test</aside>
      </div>
      <NewNoteFileUploader />
      <Footer />
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
