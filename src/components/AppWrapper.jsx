import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { getFilteredOpenDiaries } from '../state/selectors/diary.selectors';
import PolicySideNav from '../components/Policy/PolicySideNav';
import QuoteSideNav from '../components/Quote/QuoteSideNav';

import Header from './Header';
import DiaryButton from './DiaryButton';
import DetailHeader from './DetailHeader';

const CONFIG = {
  policy: {
    title: 'POLICY',
    sideNavComponent: PolicySideNav
  },
  quote: {
    title: 'QUOTE',
    sideNavComponent: QuoteSideNav
  }
};

export class AppWrapper extends Component {
  render() {
    const {
      pageTitle, match, match: { path }, onToggleDiaries, showDiaries, openDiaryCount
    } = this.props;
    const context = path.split('/')[1];
    const selectedConfig = CONFIG[context];
    const SideNav = selectedConfig.sideNavComponent;
    return (
      <React.Fragment>
        <Helmet><title>{pageTitle}</title></Helmet>
        <Header title={selectedConfig.title}>
          <DiaryButton onToggleDiaries={onToggleDiaries} showDiaries={showDiaries} openDiaryCount={openDiaryCount} />
        </Header>
        <DetailHeader context={context} />
        <main role="document" className={showDiaries ? 'diary-open' : 'diary-closed'}>
          <aside className="content-panel-left">
            <SideNav match={match} />
          </aside>
          {this.props.render()}
        </main>
      </React.Fragment>
    );
  }
}

AppWrapper.defaultProps = {
  pageTitle: 'Harmony - CSR Portal'
};

const mapStateToProps = (state, ownProps) => {
  const resource = ownProps.resourceType;
  const { resourceId } = ownProps;
  return {
    openDiaryCount: getFilteredOpenDiaries(state, resource, resourceId).count
  };
};


export default connect(mapStateToProps)(AppWrapper);
