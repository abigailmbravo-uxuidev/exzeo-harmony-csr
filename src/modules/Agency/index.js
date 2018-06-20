import React from 'react';
import { Helmet } from 'react-helmet';
import { Route } from 'react-router-dom';
import AgencyHeader from './AgencyHeader';
import AgencySideNav from './AgencySideNav';
import AgencyDetailHeader from './DetailHeader';
import Overview from './Overview';
import Contracts from './Contracts';
import Agents from './Agents';
import Loader from '../../components/Common/Loader';

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
        <Route exact path={`${props.match.url}/:agencyCode/overview`} render={prop => <Overview auth={props.auth} {...prop} />} />
        <Route exact path={`${props.match.url}/:agencyCode/contracts`} render={prop => <Contracts auth={props.auth} {...prop} />} />
        <Route exact path={`${props.match.url}/:agencyCode/agents`} render={prop => <Agents auth={props.auth} {...prop} />} />
      </div>
    </main>
  </div>
);

export default Agency;
