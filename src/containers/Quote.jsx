import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import _ from 'lodash';
import QuoteHeader from '../components/Quote/QuoteHeader';
import QuoteSideNav from '../components/Quote/QuoteSideNav';
import QuoteDetailHeader from '../components/Quote/DetailHeader';
import * as userActions from '../actions/userActions';
import Footer from '../components/Common/Footer';
import NewNoteFileUploader from '../components/Common/NewNoteFileUploader';
import UnderwritingValidationBarConnect from '../components/Quote/UnderwritingValidationBar';
import Loader from '../components/Common/Loader';
/*
const handleLogout = (props) => {
  props.actions.user.logout();
};
*/
const handleGetQuote = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  if (!taskData) return {};
  const quoteData = _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' }) ? _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' }).value.result : {};
  return quoteData;
};

export const QuoteBase = props => (
  <div className="app-wrapper csr quote">
    <Helmet><title>Harmony - CSR Portal</title></Helmet>
    {/* <NewNoteFileUploader />*/}
    <QuoteHeader />
    <QuoteDetailHeader />
    <main role="document">
      {props.appState.data.submitting && <Loader />}
      <aside className="content-panel-left">
        <QuoteSideNav />
      </aside>
      <div className="content-wrapper">

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
  quoteData: PropTypes.shape()
};

const mapStateToProps = state => (
  {
    appState: state.appState,
    user: state.user,
    quoteData: handleGetQuote(state)
  }
);
const mapDispatchToProps = dispatch => ({
  actions: {
    user: bindActionCreators(userActions, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(QuoteBase);
