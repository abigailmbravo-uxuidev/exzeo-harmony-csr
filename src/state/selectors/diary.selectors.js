import { createSelector } from 'reselect';
import { date } from '@exzeo/core-ui';

import {
  formatEntry,
  getDueStatus,
  groupDiaries,
  sortDiariesByDate
} from '../../utilities/diaries';

import { getDiaries, getDiaryOptions } from './entity.selectors';

export const getSortedDiariesByDueDate = createSelector(
  [getDiaries],
  diaries => {
    return sortDiariesByDate(diaries);
  }
);

export const getFormattedDiaries = createSelector(
  [getSortedDiariesByDueDate, getDiaryOptions],
  (diaries, diaryOptions) => {
    if (!Array.isArray(diaries)) return [];

    return diaries.map(d => {
      const entry = formatEntry(d.entries[0], diaryOptions.reasons);
      return {
        ...entry,
        diaryId: d._id,
        resourceType: d.resource.type,
        resourceId: d.resource.id,
        createdAt: d.createdAt,
        due: date.formatDate(d.entries[0].due, date.FORMATS.SECONDARY)
      };
    });
  }
);

export const getDiariesForTable = createSelector(
  [getSortedDiariesByDueDate, getDiaryOptions],
  (diaries, diaryOptions) => {
    if (!Array.isArray(diaries) || !Array.isArray(diaryOptions.reasons))
      return [];

    const diaryList = diaries.map(d => {
      const entry = formatEntry(d.entries[0], diaryOptions.reasons);
      const diaryHistory = d.entries
        .slice(1)
        .map(e => formatEntry(e, diaryOptions.reasons));
      return {
        ...entry,
        // manually setting this value so we have fine grain control over when the rows update
        rowKey: `${d._id}-${diaryHistory.length > 0 ? 'x' : 'o'}`,
        diaryId: d._id,
        createdAt: d.createdAt,
        resourceType: d.resource.type,
        resourceId: d.resource.id,
        diaryHistory,
        dueStatus: getDueStatus(d.entries[0].due, entry.open),
        due: d.entries[0].due,
        dueDateDisplay: date.formatDate(d.entries[0].due, date.FORMATS.PRIMARY),
        // deprecated - will refactor this out when moving to using context
        action: {
          diaryId: d._id,
          resourceType: d.resource.type,
          resourceId: d.resource.id,
          ...d.entries[0],
          due: date.formatDate(d.entries[0].due, date.FORMATS.SECONDARY)
        }
      };
    });

    return diaryList.sort((a, b) => {
      return b.open - a.open;
    });
  }
);

export const getOpenDiaries = createSelector(
  [getFormattedDiaries],
  formattedDairies => {
    return formattedDairies.filter(d => d.open === true);
  }
);

export const getGroupedOpenDiaries = createSelector([getOpenDiaries], diaries =>
  groupDiaries(diaries)
);

export const getDiaryReasons = createSelector(
  [getDiaryOptions],
  diaryOptions => {
    return diaryOptions && Array.isArray(diaryOptions.reasons)
      ? diaryOptions.reasons
      : [];
  }
);
