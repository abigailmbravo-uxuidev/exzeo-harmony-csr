import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAgency, getAgentList, getAgentsByAgencyCode } from '../../state/actions/agencyActions';
import AgencyHeader from './AgencyHeader';
import AgencySideNav from './AgencySideNav';
import AgencyDetailHeader from './DetailHeader';
import NewAgency from './NewAgency';
import Contracts from './Contracts';
import Agents from './Agents';

const NewAgencyRender = props => <NewAgency auth={props.auth} {...props} />;
const ContractsRender = props => <Contracts auth={props.auth} {...props} />;
const AgentsRender = props => <Agents auth={props.auth} {...props} />;

export class Agency extends Component {
  componentDidMount() {
    const { match: { params: { agencyCode } } } = this.props;
    if (agencyCode !== 'new') {
      this.props.getAgency(agencyCode);
      this.props.getAgentsByAgencyCode(agencyCode);
    }
    // this.props.getAgentList('TTIC', 'FL');
  }

  render() {
    const { agency, location, match: { params: { agencyCode }, url } } = this.props;

    return (
      <div className="app-wrapper csr agency">
        <Helmet><title>{`A: ${agencyCode}`}</title></Helmet>
        <AgencyHeader />
        <AgencyDetailHeader agency={agency} />
        <main role="document">
          <aside className="content-panel-left">
            <AgencySideNav agencyCode={agencyCode} location={location} />
          </aside>
          <div className="content-wrapper">
            <Route exact path="/agency/new" render={NewAgencyRender} />
            <Route exact path={`${url}/overview`} render={null} />
            <Route exact path={`${url}/contracts`} render={ContractsRender} />
            <Route exact path={`${url}/agents`} render={AgentsRender} />
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  agency: state.agencyState.agency
});

export default connect(mapStateToProps, { getAgency, getAgentList, getAgentsByAgencyCode })(Agency);

