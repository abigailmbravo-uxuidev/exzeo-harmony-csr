import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { getAgency, getAgentList, getAgentsByAgencyCode, getListOfOrphanedAgents } from '../../state/actions/agencyActions';
import { searchSettingsByCSPAndZip } from '../../state/actions/zipCodeSettings.actions';
import { getTerritoryManagers } from '../../state/actions/territoryManagers.actions';

import AgencyHeader from './AgencyHeader';
import AgencySideNav from './AgencySideNav';
import AgencyDetailHeader from './DetailHeader';
import Create from './Create';
import Contracts from './Contracts';
import Agents from './Agents';
import Overview from './Overview';
import CreateBranch from './CreateBranch';

const CreateRender = props => <Create auth={props.auth} {...props} />;
const ContractsRender = props => <Contracts auth={props.auth} {...props} />;

export class Agency extends Component {
  componentDidMount() {
    const { match: { params: { agencyCode } } } = this.props;
    if (agencyCode !== 'new') {
      this.props.getAgency(agencyCode);
      this.props.getAgentsByAgencyCode(agencyCode);
    }
    this.props.getListOfOrphanedAgents();
    this.props.searchSettingsByCSPAndZip('', 'FL');
    // this.props.getTerritoryManagers('FL');

    // this.props.getAgentList('TTIC', 'FL');
  }

  render() {
    const {
      agency, location, match: { params: { agencyCode, branchCode }, url }, match
    } = this.props;

    return (
      <div className="app-wrapper csr agency">
        <Helmet><title>{`A: ${agencyCode}`}</title></Helmet>
        <AgencyHeader />
        <AgencyDetailHeader agency={agency} />
        <main role="document">
          <aside className="content-panel-left">
            <AgencySideNav agencyCode={agencyCode} location={location} branchCode={branchCode} match={match} />
          </aside>
          <div className="content-wrapper">
            <Route exact path="/agency/new/0" render={CreateRender} />
            <Route exact path={`/agency/${agencyCode}/${branchCode}/overview`} render={props => <Overview branchCode={branchCode} auth={props.auth} {...props} />} />
            <Route exact path={`/agency/${agencyCode}/${branchCode}/contracts`} render={ContractsRender} />
            <Route exact path={`/agency/${agencyCode}/${branchCode}/agents`} render={props => <Agents branchCode={branchCode} auth={props.auth} {...props} />} />
            <Route exact path={`/agency/${agencyCode}/0/new`} render={props => <CreateBranch branchCode={branchCode} auth={props.auth} {...props} />} />
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  agency: state.agencyState.agency
});

export default connect(mapStateToProps, {
  getAgency, getAgentList, getAgentsByAgencyCode, getListOfOrphanedAgents, getTerritoryManagers, searchSettingsByCSPAndZip
})(Agency);

