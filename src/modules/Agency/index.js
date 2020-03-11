import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  getAgency,
  getAgentList,
  getAgentsByAgencyCode,
  getListOfOrphanedAgents,
  getAgentListByAgencyCode
} from '../../state/actions/agency.actions';
import { searchSettingsByCSPAndZip } from '../../state/actions/zipCodeSettings.actions';
import {
  getTerritoryManagers,
  getLists
} from '../../state/actions/questions.actions';
import { getPoliciesForAgency } from '../../state/actions/policy.actions';
import AgencyHeader from './AgencyHeader';
import AgencySideNav from './AgencySideNav';
import AgencyDetailHeader from './DetailHeader';
import Create from './Create';
import Contracts from './Contracts';
import Agents from './Agents';
import Overview from './Overview';
import Notes from '../../components/Notes';
import CreateBranch from './CreateBranch';
import Transfer from './Transfer';

export const CreateRender = props => <Create auth={props.auth} {...props} />;
export const ContractsRender = props => (
  <Contracts auth={props.auth} {...props} />
);

export const CreateBranchRender = branchCode => props => (
  <CreateBranch branchCode={branchCode} auth={props.auth} {...props} />
);

export const OverviewRender = (branchCode, agencyCode) => props => (
  <Overview
    branchCode={branchCode}
    agencyCode={agencyCode}
    auth={props.auth}
    {...props}
  />
);
export const AgentsRender = (branchCode, agencyCode) => props => (
  <Agents
    branchCode={branchCode}
    agencyCode={agencyCode}
    auth={props.auth}
    {...props}
  />
);
export const TransferRender = (branchCode, agencyCode) => props => (
  <Transfer
    branchCode={branchCode}
    agencyCode={agencyCode}
    auth={props.auth}
    {...props}
  />
);
export const NotesRender = agencyCode => props => (
  <Notes
    numbers={[agencyCode]}
    numberType="agencyCode"
    auth={props.auth}
    {...props}
  />
);

export class Agency extends Component {
  componentDidMount() {
    const {
      match: {
        params: { agencyCode }
      }
    } = this.props;
    if (agencyCode !== 'new') {
      this.props.getAgency(agencyCode);
      this.props.getAgentsByAgencyCode(agencyCode);
      this.props.getAgentListByAgencyCode(agencyCode);
      this.props.getPoliciesForAgency({ agencyCode });
    }
    this.props.getListOfOrphanedAgents();
    // this.props.searchSettingsByCSPAndZip('', 'FL');
    this.props.getTerritoryManagers('FL');
    this.props.getLists();
  }

  render() {
    const {
      agency,
      location,
      match: {
        params: { agencyCode, branchCode }
      },
      match
    } = this.props;

    return (
      <div className="app-wrapper csr agency">
        <Helmet>
          <title>{`A: ${agencyCode}`}</title>
        </Helmet>
        <AgencyHeader />
        <AgencyDetailHeader agency={agency} />
        <main role="document">
          <aside className="content-panel-left">
            <AgencySideNav
              agencyCode={agencyCode}
              location={location}
              branchCode={branchCode}
              match={match}
            />
          </aside>
          <div className="content-wrapper" data-test="agency-links">
            <Route exact path="/agency/new/0" render={CreateRender} />
            <Route
              exact
              path={`/agency/${agencyCode}/${branchCode}/overview`}
              render={OverviewRender(branchCode, agencyCode)}
            />
            <Route
              exact
              path={`/agency/${agencyCode}/${branchCode}/contracts`}
              render={ContractsRender}
            />
            <Route
              exact
              path={`/agency/${agencyCode}/${branchCode}/agents`}
              render={AgentsRender(branchCode, agencyCode)}
            />
            <Route
              exact
              path={`/agency/${agencyCode}/${branchCode}/transfer`}
              render={TransferRender(branchCode, agencyCode)}
            />
            <Route
              exact
              path={`/agency/${agencyCode}/${branchCode}/notes`}
              render={NotesRender(agencyCode)}
            />
            <Route
              exact
              path={`/agency/${agencyCode}/0/new`}
              render={CreateBranchRender(branchCode)}
            />
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  agency: state.agencyState.agency,
  territoryManagers: state.questions.territoryManagers
});

export default connect(mapStateToProps, {
  getAgency,
  getAgentList,
  getAgentListByAgencyCode,
  getAgentsByAgencyCode,
  getListOfOrphanedAgents,
  getTerritoryManagers,
  searchSettingsByCSPAndZip,
  getLists,
  getPoliciesForAgency
})(Agency);
