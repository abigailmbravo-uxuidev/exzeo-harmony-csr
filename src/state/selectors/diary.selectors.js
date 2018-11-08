import { createSelector } from 'reselect';
import { date } from '@exzeo/core-ui';

import { getDueStatus, groupDiaries, sortDiariesByDate } from '../../utilities/diaries';

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
    return diaries.map(d => ({
      diaryId: d._id,
      resourceType: d.resource.type,
      resourceId: d.resource.id,
      ...d.entries[0],
      due: date.formatDate(d.entries[0].due, date.FORMATS.SECONDARY)
    }));
  }
);

export const getFormattedAllDiaries = createSelector(
  [getDiaries],
  (diaries) => {
    return diaries.map(d => ({
      diaryId: d._id,
      resourceType: d.resource.type,
      resourceId: d.resource.id,
      ...d.entries[0],
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
    }));
  }
);

export const getFilterOpenDiariesByResource = createSelector(
  [getFormattedDiaries],
  (formattedDairies) => {
    if (!Array.isArray(formattedDairies)) return [];
    return formattedDairies.filter(d => d.open === true);
  }
);

export const getFilteredAllDiaries = createSelector(
  [getFormattedAllDiaries],
  (formattedDairies) => {
    if (!Array.isArray(formattedDairies)) return [];

    return formattedDairies;
  }
);

export const getOpenDiaries = createSelector(
  [getFormattedDiaries],
  diaries => groupDiaries(diaries)
);

export const getFilteredOpenDiaries = createSelector(
  [getFilterOpenDiariesByResource],
  diaries => groupDiaries(diaries)
);

export const isPollingPermitted = createSelector(
  [getUserProfile],
  (userProfile) => {
    const { resources } = userProfile;
    if (!resources) return false;

    const diariesResources = resources.filter((resource) => {
      const arr = resource.uri.split(':');
      return arr.includes('Diaries');
    });

    // user needs all three Diaries resources to to be able to see them.
    return diariesResources.length === 3;
  }
);

