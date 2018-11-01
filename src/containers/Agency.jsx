import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import { Loader } from '@exzeo/core-ui';

import AgencyHeader from '../modules/Agency/AgencyHeader';
import AgencySideNav from '../components/Agency/AgencySideNav';
import AgencyDetailHeader from '../components/DetailHeader';
import * as appStateActions from '../state/actions/appState.actions';
import * as serviceActions from '../state/actions/service.actions';
import { OpenDiariesBar } from '../components/OpenDiariesBar';

export class Agency extends React.Component {
  state = {
    showDiaries: false
  }

  toggleDiariesHandler = () => {
    this.setState({ showDiaries: !this.state.showDiaries });
  }

  render() {
    const { agency, children } = this.props;
    const { showDiaries } = this.state;

    return (
      <div className="app-wrapper csr agency">
        <Helmet><title>{agency && agency.agencyCode ? `A: ${agency.agencyCode}` : 'Harmony - CSR Portal'}</title></Helmet>
        <AgencyHeader toggleDiaries={this.toggleDiariesHandler} showDiaries={showDiaries} />
        <AgencyDetailHeader />
        <main role="document">
          {!agency && <Loader />}
          <aside className="content-panel-left">
            <AgencySideNav agencyCode={agency ? agency.agencyCode : null} />
          </aside>
          <div className="content-wrapper">
            {children}
          </div>
          {showDiaries && <OpenDiariesBar resourceType="Agency" resourceId={agency.agencyCode} />}
        </main>
      </div>
    );
  }
}

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
