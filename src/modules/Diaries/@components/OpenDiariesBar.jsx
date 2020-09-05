import React, { useMemo } from 'react';

import Diaries from './Diaries';
import { useDiaries } from '../../../context/diaries-context';
import { groupOpenDiaries } from '../utilities';

const OpenDiariesBar = ({ document }) => {
  const { diaries, diaryEnums, diariesDispatch } = useDiaries();
  const groupedDiaries = useMemo(() => {
    return groupOpenDiaries(diaries, diaryEnums);
  }, [diaries, diaryEnums]);

  const handleEditDiary = diary => {
    diariesDispatch({ type: 'makeDiary', document, diaryId: diary._id });
  };

  const { dueSoon, pastDue, upComing, count } = groupedDiaries;

  return (
    count > 0 && (
      <aside className="open-diaries">
        <header className="open-diaries-header">
          <h4 data-test="open-diaries-header">Open Diaries</h4>
        </header>
        <div className="diaries-list">
          {pastDue.length > 0 && (
            <Diaries
              diaryLevel="pastDue"
              diaries={pastDue}
              handleClick={handleEditDiary}
            />
          )}
          {dueSoon.length > 0 && (
            <Diaries
              diaryLevel="dueSoon"
              diaries={dueSoon}
              handleClick={handleEditDiary}
            />
          )}

          {upComing.length > 0 && (
            <Diaries
              diaryLevel="upComing"
              diaries={upComing}
              handleClick={handleEditDiary}
            />
          )}
        </div>
      </aside>
    )
  );
};

export default OpenDiariesBar;
