import { createSelector } from 'reselect';
import { date } from '@exzeo/core-ui';

import { formatEntry, getDueStatus, groupDiaries, sortDiariesByDate } from '../../utilities/diaries';

import { getDiaries, getUserProfile } from './entity.selectors';

export const getSortedDiariesByDueDate = createSelector(
  [getDiaries],
  (diaries) => {
    return sortDiariesByDate(diaries);
  }
);

export const getFormattedDiaries = createSelector(
  [getSortedDiariesByDueDate],
  (diaries) => {
    if (!Array.isArray(diaries)) return [];

    return diaries.map(d => ({
      diaryId: d._id,
      resourceType: d.resource.type,
      resourceId: d.resource.id,
      ...d.entries[0],
      due: date.formatDate(d.entries[0].due, date.FORMATS.SECONDARY)
    }));
  }
);

export const getDiariesForTable = createSelector(
  [getSortedDiariesByDueDate],
  (diaries) => {
    if (!Array.isArray(diaries)) return [];

    return diaries.map(d => {
      const entry = formatEntry(d.entries[0]);
      return ({
        diaryId: d._id,
        resourceType: d.resource.type,
        resourceId: d.resource.id,
        ...entry,
        diaryHistory: d.entries.slice(1),
        due: date.formatDate(d.entries[0].due, date.FORMATS.SECONDARY),
        dueStatus: getDueStatus(d.entries[0].due, d.entries[0].open),
        action: {
          diaryId: d._id,
          resourceType: d.resource.type,
          resourceId: d.resource.id,
          ...d.entries[0],
          due: date.formatDate(d.entries[0].due, date.FORMATS.SECONDARY)
        }
      });
    });
  }
);

export const getOpenDiaries = createSelector(
  [getFormattedDiaries],
  (formattedDairies) => {
    return formattedDairies.filter(d => d.open === true);
  }
);

export const getGroupedOpenDiaries = createSelector(
  [getOpenDiaries],
  diaries => groupDiaries(diaries)
);

export const isPollingPermitted = createSelector(
  [getUserProfile],
  (userProfile) => {
    const { resources } = userProfile;
    if (!Array.isArray(resources)) return false;

    const diariesResources = resources.filter((resource) => {
      const arr = resource.uri.split(':');
      return arr.includes('Diaries');
    });

    // user needs all three Diaries resources to to be able to see them.
    return diariesResources.length === 3;
  }
);

