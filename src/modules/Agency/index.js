import React from 'react';
import { Helmet } from 'react-helmet';
import { Route } from 'react-router-dom';
import AgencyHeader from './AgencyHeader';
import AgencySideNav from './AgencySideNav';
import AgencyDetailHeader from './DetailHeader';
import Overview from './Overview';
import Contracts from './Contracts';
import Agents from './Agents';

const OverviewRender = props => <Overview auth={props.auth} {...props} />;
const ContractsRender = props => <Contracts auth={props.auth} {...props} />;
const AgentsRender = props => <Agents auth={props.auth} {...props} />;

export const Agency = props => (
  <div className="app-wrapper csr agency">
    <Helmet><title>{props.agency && props.agency.agencyCode ? `A: ${props.agency.agencyCode}` : 'Harmony - CSR Portal'}</title></Helmet>
    <AgencyHeader />
    <AgencyDetailHeader />
    <main role="document">
      <aside className="content-panel-left">
        <AgencySideNav />
      </aside>
      <div className="content-wrapper">
        <Route exact path={`${props.match.url}/:agencyCode/overview`} render={OverviewRender} />
        <Route exact path={`${props.match.url}/:agencyCode/contracts`} render={ContractsRender} />
        <Route exact path={`${props.match.url}/:agencyCode/agents`} render={AgentsRender} />
      </div>
    </main>
  </div>
);

export default Agency;
