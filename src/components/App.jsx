import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import Header from './Header';
import DiaryButton from './DiaryButton';

import PolicySideNav from '../components/Policy/PolicySideNav';
import QuoteSideNav from '../components/Quote/QuoteSideNav';
import { getFilteredOpenDiaries } from '../state/selectors/diary.selectors';
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

export class App extends Component {
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

App.defaultProps = {
  pageTitle: 'Harmony - CSR Portal'
};

const mapStateToProps = (state, ownProps) => {
  const resource = ownProps.match.path.split('/')[1];
  return {
    openDiaryCount: getFilteredOpenDiaries(state, resource).count
  };
};


export default connect(mapStateToProps)(App);
