import React from 'react';
import { Button } from '@exzeo/core-ui';
// import { useDiaries } from '../../../context/diaries-context';
// import { filterOpenDiaries } from '../utilities';

const DiaryIndicator = ({
  diariesDispatch,
  showDiaries,
  openDiaryCount
  // meta
}) => {
  // TODO - (Add a ticket before merging if this comment is still here) this can be un-commented after we remove from WorkflowWrapper, which is waiting on some CSS changes.
  // const {
  //   showDiariesBar,
  //   toggleShowDiariesBar,
  //   diaries,
  //   diaryEnums,
  //   getDiaryEnums
  // } = useDiaries();
  //
  // useEffect(() => {
  //   getDiaryEnums({
  //     companyCode: meta.companyCode,
  //     state: meta.state,
  //     product: meta.product
  //   });
  // }, [meta.companyCode, meta.state, meta.product, getDiaryEnums]);
  //
  // const openDiaryCount = useMemo(() => {
  //   const openDiaries = filterOpenDiaries(diaries, diaryEnums);
  //   return openDiaries.length;
  // }, [diaries, diaryEnums]);

  return (
    <div
      className={
        openDiaryCount > 0
          ? 'header-toggle-wrapper active-diaries'
          : 'header-toggle-wrapper'
      }
    >
      <Button
        onClick={() => diariesDispatch({ type: 'toggleDiariesBar' })}
        className={Button.constants.classNames.primary}
        customClass="link"
        type="button"
        dataTest="diaryButton"
      >
        {showDiaries ? (
          <div
            className="diary-btn-wrapper panel-open"
            data-test="diary-btn-wrapper"
          >
            <i className="fa fa-bookmark">
              <span>{openDiaryCount}</span>
            </i>
            <span>
              <i className="fa fa-chevron-circle-right" />
              Hide
            </span>
          </div>
        ) : (
          <div
            className="diary-btn-wrapper panel-closed"
            data-test="diary-btn-wrapper"
          >
            <i className="fa fa-bookmark">
              <span>{openDiaryCount}</span>
            </i>
            <span>
              <i className="fa fa-chevron-circle-left" />
              Show
            </span>
          </div>
        )}
      </Button>
    </div>
  );
};

export default DiaryIndicator;
