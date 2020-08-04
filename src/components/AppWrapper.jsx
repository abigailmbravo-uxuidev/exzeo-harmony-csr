import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { DetailsHeader, Banner } from '@exzeo/core-ui/src/@Harmony';

import {
  getPolicyDetails,
  getQuoteDetails
} from '../state/selectors/detailHeader.selectors';
import { getOpenDiaries } from '../state/selectors/diary.selectors';

import PolicySideNav from './PolicySideNav';
import QuoteSideNav from './QuoteSideNav';
import Header from './Header';
import DiaryButton from './DiaryButton';
import ClaimsIndicator from './ClaimsIndicator';

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
      claims,
      context,
      header,
      headerDetails,
      match,
      modalHandlers,
      openDiaryCount,
      onToggleDiaries,
      pageTitle,
      showDiaries
    } = this.props;

    const appConfig = CONFIG[context];
    const SideNav = appConfig.sideNavComponent;

    return (
      <React.Fragment>
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>
        <Header title={appConfig.title}>
          <div className="header-indicator-wrapper">
            {header.banner && <Banner content={header.banner} />}
            <ClaimsIndicator claims={claims} />
            <DiaryButton
              onToggleDiaries={onToggleDiaries}
              showDiaries={showDiaries}
              openDiaryCount={openDiaryCount}
            />
          </div>
        </Header>
        <DetailsHeader
          context={context}
          modalHandlers={modalHandlers}
          detailsFields={header}
          headerDetails={headerDetails}
        />
        <main
          role="document"
          className={
            showDiaries && openDiaryCount > 0 ? 'diary-open' : 'diary-closed'
          }
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
    claims: state.policyState.claims,
    headerDetails: selectors[ownProps.context](state),
    openDiaryCount: getOpenDiaries(state).length
  };
};

export default connect(mapStateToProps)(AppWrapper);
