import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import ReduxToastr from 'react-redux-toastr';
import QuoteHeader from '../components/Quote/QuoteHeader';
import QuoteSideNav from '../components/Quote/QuoteSideNav';
import QuoteDetailHeader from '../components/Quote/DetailHeader';
import * as userActions from '../actions/userActions';
import Footer from '../components/Common/Footer';
import NewNoteFileUploader from '../components/Common/NewNoteFileUploader';
import UnderwritingValidationBarConnect from '../components/Quote/UnderwritingValidationBar';

/*
const handleLogout = (props) => {
  props.actions.user.logout();
};
*/


export const QuoteBase = props => (
  <div className="app-wrapper csr quote">
    <Helmet><title>Harmony - CSR Portal</title></Helmet>
    {/*<NewNoteFileUploader />*/}
    <QuoteHeader />
    <main role="document">
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
      />
      <aside className="content-panel-left">
        <div className="user">
          <label htmlFor="user">Policyholder</label>
          <p className="user-name">{props.appState && props.appState.data && props.appState.data.quote &&
            props.appState.data.quote.policyHolders &&
            props.appState.data.quote.policyHolders[0] ? `${props.appState.data.quote.policyHolders[0].firstName} ${props.appState.data.quote.policyHolders[0].lastName}` : '-'}</p>
        </div>
        <QuoteSideNav />
      </aside>
      <div className="content-wrapper">
        <QuoteDetailHeader />
        {props.children}
        <Footer />
      </div>
      <UnderwritingValidationBarConnect />
    </main>
  </div>
);

QuoteBase.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  appState: PropTypes.shape({
    instanceId: PropTypes.string,
    modelName: PropTypes.string,
    data: PropTypes.shape({
      quote: PropTypes.object,
      updateWorkflowDetails: PropTypes.boolean,
      hideYoChildren: PropTypes.boolean,
      recalc: PropTypes.boolean
    })
  })
};

const mapStateToProps = state => (
  {
    appState: state.appState,
    user: state.user
  }
);
const mapDispatchToProps = dispatch => ({
  actions: {
    user: bindActionCreators(userActions, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(QuoteBase);
