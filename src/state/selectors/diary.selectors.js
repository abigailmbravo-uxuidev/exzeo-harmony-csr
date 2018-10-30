import { createSelector } from 'reselect';
import moment from 'moment-timezone';
import { date } from '@exzeo/core-ui';

import { getDueStatus, groupDiaries } from '../../utilities/diaries';

import { getDiaries } from './entity.selectors';

export const getFormattedDiaries = createSelector(
  [getDiaries],
  (diaries) => {
    return diaries.map(d => ({
      diaryId: d._id,
      resourceType: d.resource.type,
      resourceId: d.resource.id,
      ...d.entries[0],
      due: moment.utc(d.entries[0].due).format(date.FORMATS.SECONDARY)
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
      due: moment.utc(d.entries[0].due).format(date.FORMATS.SECONDARY),
      dueStatus: getDueStatus(d.entries[0].due, d.entries[0].open),
      action: {
        diaryId: d._id,
        resourceType: d.resource.type,
        resourceId: d.resource.id,
        ...d.entries[0],
        due: moment.utc(d.entries[0].due).format(date.FORMATS.SECONDARY)
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

