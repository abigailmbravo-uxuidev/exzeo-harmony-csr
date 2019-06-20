import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { DetailsHeader } from '@exzeo/core-ui/src/@Harmony';

import {
  getPolicyDetails,
  getQuoteDetails
} from '../state/selectors/detailHeader.selectors';
import { getOpenDiaries } from '../state/selectors/diary.selectors';
import PolicySideNav from '../components/Policy/PolicySideNav';
import QuoteSideNav from './QuoteSideNav';

import Header from './Header';
import DiaryButton from './DiaryButton';

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
      header,
      pageTitle,
      match,
      context,
      onToggleDiaries,
      showDiaries,
      openDiaryCount,
      headerDetails,
      modalHandlers
    } = this.props;

    const appConfig = CONFIG[context];
    const SideNav = appConfig.sideNavComponent;

    return (
      <React.Fragment>
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>
        <Header title={appConfig.title}>
          <DiaryButton
            onToggleDiaries={onToggleDiaries}
            showDiaries={showDiaries}
            openDiaryCount={openDiaryCount}
          />
        </Header>
        <DetailsHeader
          context={context}
          modalHandlers={modalHandlers}
          detailsFields={header}
          headerDetails={headerDetails}
        />
        <main
          role="document"
          className={showDiaries ? 'diary-open' : 'diary-closed'}
        >
          <aside className="content-panel-left">
            <SideNav match={match} />
          </aside>
          {this.props.children || this.props.render()}
        </main>
      </React.Fragment>
    );
  }
}

AppWrapper.defaultProps = {
  pageTitle: 'Harmony - CSR Portal'
};

const mapStateToProps = (state, ownProps) => {
  const selectors = { policy: getPolicyDetails, quote: getQuoteDetails };
  return {
    headerDetails: selectors[ownProps.context](state),
    openDiaryCount: getOpenDiaries(state).length
  };
};

export default connect(mapStateToProps)(AppWrapper);
