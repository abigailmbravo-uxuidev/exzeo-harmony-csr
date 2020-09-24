import React, { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Banner } from '@exzeo/core-ui/src/@Harmony';

import Header from './Header';
import { DiariesIndicator, filterOpenDiaries } from '../modules/Diaries';
import { useDiaries } from '../context/diaries-context';
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
  // TODO - (Add a ticket before merging if this comment is still here) for now this is here because WorkflowWrapper is checking 'showDiaries' and 'openDiaryCount' for styling. See if we can change that and remove diaries altogether from this component. Spoke with Joe and it seems we will be able to remove that check, then we will be able to put all this logic related to diaries inside the DiariesIndicator
  const {
    showDiariesBar,
    diariesDispatch,
    diaries,
    diaryEnums,
    getDiaryEnums
  } = useDiaries();

  useEffect(() => {
    getDiaryEnums({
      companyCode: meta.companyCode,
      state: meta.state,
      product: meta.product
    });
  }, [meta.companyCode, meta.state, meta.product, getDiaryEnums]);

  const openDiaryCount = useMemo(() => {
    const openDiaries = filterOpenDiaries(diaries, diaryEnums);
    return openDiaries.length;
  }, [diaries, diaryEnums]);

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
          <DiariesIndicator
            showDiaries={showDiariesBar}
            openDiaryCount={openDiaryCount}
            diariesDispatch={diariesDispatch}
            pollingFilter={diaryPollingFilter}
            meta={meta}
          />
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
