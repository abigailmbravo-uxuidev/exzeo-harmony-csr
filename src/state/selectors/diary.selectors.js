import { createSelector } from 'reselect';
import { date } from '@exzeo/core-ui';

import {
  formatEntry,
  getDueStatus,
  groupDiaries,
  sortDiariesByDate
} from '../../utilities/diaries';

import { getDiaries, getUserProfile } from './entity.selectors';

export const getSortedDiariesByDueDate = createSelector(
  [getDiaries],
  diaries => {
    return sortDiariesByDate(diaries);
  }
);

export const getFormattedDiaries = createSelector(
  [getSortedDiariesByDueDate],
  diaries => {
    if (!Array.isArray(diaries)) return [];

    return diaries.map(d => {
      const entry = formatEntry(d.entries[0]);
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
  [getSortedDiariesByDueDate],
  diaries => {
    if (!Array.isArray(diaries)) return [];

    return diaries.map(d => {
      const entry = formatEntry(d.entries[0]);
      return {
        ...entry,
        diaryId: d._id,
        createdAt: d.createdAt,
        resourceType: d.resource.type,
        resourceId: d.resource.id,
        diaryHistory: d.entries.slice(1).map(e => formatEntry(e)),
        dueStatus: getDueStatus(entry.due, entry.open),
        action: {
          diaryId: d._id,
          resourceType: d.resource.type,
          resourceId: d.resource.id,
          ...d.entries[0],
          due: date.formatDate(d.entries[0].due, date.FORMATS.SECONDARY)
        }
      };
    });
  }
);

export const getOpenDiaries = createSelector(
  [getFormattedDiaries],
  formattedDairies => {
    return formattedDairies.filter(d => d.open === true);
  }
);

export const getGroupedOpenDiaries = createSelector(
  [getOpenDiaries],
  diaries => groupDiaries(diaries)
);

const REQUIRED_DIARY_RIGHTS = ['READ', 'UPDATE', 'INSERT'];

export const isPollingPermitted = createSelector(
  [getUserProfile],
  userProfile => {
    const { resources } = userProfile;
    if (!Array.isArray(resources)) return false;

    const diariesResources = [];
    // find all three 'Diaries' resources ignoring duplicates
    REQUIRED_DIARY_RIGHTS.forEach(right => {
      const resource = resources.find(r => {
        return r.uri.indexOf('Diaries') !== -1 && r.right === right;
      });

      if (resource) {
        diariesResources.push(resource);
      }
    });

    return diariesResources.length === 3;
  }
);

const getComponentProps = (state, props) => props;

export const getInitialValuesForForm = createSelector(
  [getDiaries, getComponentProps],
  (diaries, props) => {
    const resource = {
      resourceType: props.resourceType,
      resourceId: props.resourceId
    };

    if (props.diaryId) {
      const selectedDiary = diaries.find(d => d._id === props.diaryId);
      return selectedDiary
        ? {
            ...selectedDiary.entries[0],
            due: date.formatDate(
              selectedDiary.entries[0].due,
              date.FORMATS.SECONDARY
            )
          }
        : { ...resource };
    }
    return { ...resource };
  }
);
