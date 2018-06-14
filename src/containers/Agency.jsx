import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import AgencyHeader from '../components/Agency/AgencyHeader';
import AgencySideNav from '../components/Agency/AgencySideNav';
import AgencyDetailHeader from '../components/Agency/DetailHeader';
import Loader from '../components/Common/Loader';
import * as appStateActions from '../state/actions/appStateActions';
import * as serviceActions from '../state/actions/serviceActions';

export const Agency = props => (
  <div className="app-wrapper csr agency">
    <Helmet><title>{props.agency && props.agency.agencyCode ? `A: ${props.agency.agencyCode}` : 'Harmony - CSR Portal'}</title></Helmet>
    <AgencyHeader />
    <AgencyDetailHeader />
    <main role="document">
      { !props.agency && <Loader />}
      <aside className="content-panel-left">
        <AgencySideNav />
      </aside>
      <div className="content-wrapper">
        {props.children}
      </div>
    </main>
  </div>
);

Agency.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  agency: PropTypes.shape()
};

const mapStateToProps = state => ({
  agency: state.service.agency
});

const mapDispatchToProps = dispatch => ({
  actions: {
    serviceActions: bindActionCreators(serviceActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Agency);
