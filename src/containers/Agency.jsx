import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import Loader from '@exzeo/core-ui/lib/Loader';
import AgencyHeader from '../components/Agency/AgencyHeader';
import AgencySideNav from '../components/Agency/AgencySideNav';
import AgencyDetailHeader from '../components/Agency/DetailHeader';
import * as appStateActions from '../state/actions/appStateActions';
import * as serviceActions from '../state/actions/serviceActions';

import { OpenDiariesBar } from '../modules/Diaries/OpenDiariesBar';
import DiaryModal from '../components/Common/DiaryModal';

export class Agency extends React.Component {
  state = {
    showDiaries: false,
    showDiaryModal: false,
    selectedDiary: null
  }

  toggleDiariesHandler = () => {
    this.setState({ showDiaries: !this.state.showDiaries });
  }

  openDiaryModalHandler = (diary) => {
    this.setState({ showDiaryModal: true, selectedDiary: diary });
  }

  closeDiaryModalHandler = () => {
    this.setState({ showDiaryModal: false, selectedDiary: null });
  }

  render() {
    const { agency, children } = this.props;
    const { showDiaries, showDiaryModal, selectedDiary } = this.state;

    return (<div className="app-wrapper csr agency">
      <Helmet><title>{agency && agency.agencyCode ? `A: ${agency.agencyCode}` : 'Harmony - CSR Portal'}</title></Helmet>
      <AgencyHeader toggleDiaries={this.toggleDiariesHandler} showDiaries={showDiaries} />
      <AgencyDetailHeader />
      <main role="document">
        { !agency && <Loader />}
        <aside className="content-panel-left">
          <AgencySideNav agencyCode={agency ? agency.agencyCode : null} openDiaryModalHandler={this.openDiaryModalHandler} />
        </aside>
        <div className="content-wrapper">
          {children}
        </div>
        {showDiaries && <OpenDiariesBar openHandler={this.openDiaryModalHandler} />}
        {showDiaryModal && <DiaryModal closeHandler={this.closeDiaryModalHandler} initialValues={selectedDiary} />}
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
