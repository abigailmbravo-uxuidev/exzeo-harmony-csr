import React from 'react';
import { Helmet } from 'react-helmet';
import { Banner } from '@exzeo/core-ui/src/@Harmony';

import Header from './Header';
import { DiariesIndicator } from '../modules/Diaries';
import ClaimsIndicator from './ClaimsIndicator';

const WorkflowWrapper = ({
  children,
  template: { meta, header },
  diaryPollingFilter,
  headerTitle,
  subHeader,
  aside,
  pageTitle = 'Harmony - CSR Portal'
}) => {
  return (
    <React.Fragment>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <Header
        title={
          <div className="tab-tag">
            <span>{headerTitle}</span>
          </div>
        }
        diaryPollingFilter={diaryPollingFilter}
      >
        <div className="header-indicator-wrapper">
          {header.banner && <Banner content={header.banner} />}
          <ClaimsIndicator />
          <DiariesIndicator meta={meta} />
        </div>
      </Header>
      {subHeader}
      <main role="document">
        {aside}
        {children}
      </main>
    </React.Fragment>
  );
};

export default WorkflowWrapper;
