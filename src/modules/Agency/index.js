import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  getAgency,
  getAgentsByAgencyCode,
  getListOfOrphanedAgents,
  getAgentListByAgencyCode
} from '../../state/actions/agency.actions';
import { getLists } from '../../state/actions/questions.actions';
import { getPoliciesForAgency } from '../../state/actions/policy.actions';
import AgencyHeader from './AgencyHeader';
import AgencySideNav from './AgencySideNav';
import AgencyDetailHeader from './DetailHeader';
import Create from './Create';
import Contracts from './Contracts';
import Agents from './Agents';
import Overview from './Overview';
import Notes from './NotesFiles';
import CreateBranch from './CreateBranch';
import Transfer from './Transfer';

export class Agency extends Component {
  componentDidMount() {
    const { agencyCode } = this.props.match.params;
    if (agencyCode !== 'new') {
      this.props.getAgency(agencyCode);
      this.props.getAgentsByAgencyCode(agencyCode);
      this.props.getAgentListByAgencyCode(agencyCode);
      this.props.getPoliciesForAgency({ agencyCode });
    }
    this.props.getListOfOrphanedAgents();
    this.props.getLists();
  }

  render() {
    const {
      agency,
      location,
      match,
      match: {
        params: { agencyCode, branchCode }
      }
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
            <Route
              exact
              path="/agency/new/0"
              render={props => <Create auth={props.auth} {...props} />}
            />
            <Route
              exact
              path={`/agency/${agencyCode}/${branchCode}/overview`}
              render={props => (
                <Overview
                  branchCode={branchCode}
                  agencyCode={agencyCode}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path={`/agency/${agencyCode}/${branchCode}/contracts`}
              render={props => <Contracts {...props} />}
            />
            <Route
              exact
              path={`/agency/${agencyCode}/${branchCode}/agents`}
              render={props => (
                <Agents
                  branchCode={branchCode}
                  agencyCode={agencyCode}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path={`/agency/${agencyCode}/${branchCode}/transfer`}
              render={props => (
                <Transfer
                  branchCode={branchCode}
                  agencyCode={agencyCode}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path={`/agency/${agencyCode}/${branchCode}/notes`}
              render={props => <Notes {...props} agencyCode={agencyCode} />}
            />
            <Route
              exact
              path={`/agency/${agencyCode}/0/new`}
              render={props => (
                <CreateBranch branchCode={branchCode} {...props} />
              )}
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
  getAgentListByAgencyCode,
  getAgentsByAgencyCode,
  getListOfOrphanedAgents,
  getLists,
  getPoliciesForAgency
})(Agency);
