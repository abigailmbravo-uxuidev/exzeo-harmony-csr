import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { getPolicyDetails, getQuoteDetails } from '../state/selectors/detailHeader.selectors';
import { getOpenDiaries } from '../state/selectors/diary.selectors';
import PolicySideNav from '../components/Policy/PolicySideNav';
import QuoteSideNav from '../components/Quote/QuoteSideNav';

import Header from './Header';
import DiaryButton from './DiaryButton';
import { DetailsHeader } from '@exzeo/core-ui/@Harmony';

const CONFIG = {
  policy: {
    title: 'POLICY',
    sideNavComponent: PolicySideNav,
    detailsFields: {
      showEffectiveDateButton: true,
      showReinstateButton: true,
      fields: [
        { value: 'policyHolder', component: 'Section', label: 'Policyholder' },
        { value: 'mailingAddress', component: 'Section' },
        { value: 'propertyAddress', component: 'Section' },
        { value: 'county', label: 'Property County' },
        { value: 'territory' },
        { value: 'constructionType' },
        { value: 'effectiveDate' },
        { value: 'cancellation' },
        { value: 'finalPayment', label: 'Final Payment' },
        { value: 'currentPremium', className:'premium' }
      ]
    }
  },
  quote: {
    title: 'QUOTE',
    sideNavComponent: QuoteSideNav,
    detailsFields: {
      hideDeatailSummary: true,
      fields: [
        { value: 'policyHolder', component: 'Section', label: 'Policyholder' },
        { value: 'mailingAddress', component: 'Section' },
        { value: 'propertyAddress', component: 'Section' },
        { value: 'county', label: 'Property County' },
        { value: 'territory' },
        { value: 'constructionType' },
        { value: 'effectiveDate', className: 'quoteEffectiveDate'},
        { value: 'currentPremium', label: 'Premium', className:'premium' }
      ]
    }
  }
};

export class AppWrapper extends Component {
  render() {
    const {
      pageTitle, match, context, onToggleDiaries, showDiaries, openDiaryCount, headerDetails, modalHandlers
    } = this.props;

    const appConfig = CONFIG[context];
    const SideNav = appConfig.sideNavComponent;

    return (
      <React.Fragment>
        <Helmet><title>{pageTitle}</title></Helmet>
        <Header title={appConfig.title}>
          <DiaryButton onToggleDiaries={onToggleDiaries} showDiaries={showDiaries} openDiaryCount={openDiaryCount} />
        </Header>
        <DetailsHeader
          context={context}
          modalHandlers={modalHandlers}
          detailsFields={appConfig.detailsFields}
          headerDetails={headerDetails}
        />
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
  const selectors = {policy: getPolicyDetails, quote: getQuoteDetails}
  return {
    headerDetails: selectors[ownProps.context](state),
    openDiaryCount: getOpenDiaries(state).length
  };
};


export default connect(mapStateToProps)(AppWrapper);
