import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PolicyHeader from '../components/Policy/PolicyHeader';
import QuoteSideNav from '../components/Policy/PolicySideNav';
import PolicyDetailHeader from '../components/Policy/DetailHeader';
import Loader from '../components/Common/Loader';

export const Policy = props => (
  <div className="app-wrapper csr policy">
    {/* TODO: dynamically add policy # to title*/}
    <Helmet><title>{props.policy && props.policy.policyNumber ? `P: ${props.policy.policyNumber}` : 'Harmony - CSR Portal'}</title></Helmet>
    {/* <NewNoteFileUploader/>*/}
    <PolicyHeader />
    <PolicyDetailHeader />
    <main role="document">
      {props.appState.data.submitting && <Loader />}
      <aside className="content-panel-left">
        <QuoteSideNav />
      </aside>
      <div className="content-wrapper">
        {props.children}
      </div>
    </main>
  </div>
);

Policy.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  policy: PropTypes.shape()
};

const mapStateToProps = state => ({
  policyState: state.policy,
  tasks: state.cg,
  appState: state.appState,
  summaryLedger: state.service.getSummaryLedger,
  policy: state.service.latestPolicy || {}
});

export default connect(mapStateToProps)(Policy);
