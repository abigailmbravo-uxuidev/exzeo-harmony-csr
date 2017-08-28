import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import _ from 'lodash';

import PolicyHeader from '../components/Policy/PolicyHeader';
import QuoteSideNav from '../components/Policy/PolicySideNav';
import PolicyDetailHeader from '../components/Policy/DetailHeader';

import Loader from '../components/Common/Loader';

// import NewNoteFileUploader from '../components/Common/NewNoteFileUploader';

/*
const handleLogout = (props) => {
  props.actions.user.logout();
};
*/

const handleGetPolicy = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  if (!taskData) return {};
  const policyData = _.find(taskData.model.variables, { name: 'retrievePolicy' }) ? _.find(taskData.model.variables, { name: 'retrievePolicy' }).value[0] : {};
  return policyData;
};


export const Policy = props => (
  <div className="app-wrapper csr policy">
    {/* TODO: dynamically add policy # to title*/}
    <Helmet><title>{props.policy.policyNumber ? `P: ${props.policy.policyNumber}` : 'Harmony - CSR Portal'}</title></Helmet>
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

const mapStateToProps = state => ({ appState: state.appState, policy: handleGetPolicy(state) });

export default connect(mapStateToProps)(Policy);
