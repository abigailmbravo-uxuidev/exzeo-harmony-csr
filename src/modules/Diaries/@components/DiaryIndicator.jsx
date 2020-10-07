import React, { useEffect, useMemo } from 'react';
import { Button } from '@exzeo/core-ui';
import { useDiaries } from '../../../context/diaries-context';
import { filterOpenDiaries } from '../utilities';

const DiaryIndicator = ({ meta }) => {
  const {
    showDiariesBar: showDiaries,
    diaries,
    diaryEnums,
    getDiaryEnums,
    diariesDispatch
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
