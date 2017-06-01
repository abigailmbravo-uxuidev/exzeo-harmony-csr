import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Helmet } from 'react-helmet';
import QuoteHeader from '../components/Policy/PolicyHeader';
import QuoteSideNav from '../components/Policy/PolicySideNav';
import DetailHeader from '../components/Policy/DetailHeader';
import * as userActions from '../actions/userActions';
import Footer from '../components/Common/Footer';
//import NewNoteFileUploader from '../components/Common/NewNoteFileUploader';

/*
const handleLogout = (props) => {
  props.actions.user.logout();
};
*/

export const Policy = props => (
  <div className="app-wrapper csr policy">
    {/*TODO: dynamically add policy # to title*/}
    <Helmet><title>Policy [policyNumber]</title></Helmet>
    {/*<NewNoteFileUploader/>*/}
    <QuoteHeader/>
    <DetailHeader />
    <main role="document">
      <aside className="content-panel-left">
        <QuoteSideNav/>
      </aside>
      <div className="content-wrapper">
        {props.children}
        <Footer/>
      </div>
    </main>
  </div>
);

Policy.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(Policy);
