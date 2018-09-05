import { createSelector } from 'reselect';
import moment from 'moment-timezone';
// import date from '@exzeo/core-ui/lib/Utilities';

const getTodayFormatted = () => moment().utc().format('YYYY-MM-DD');

const isGreaterThanOneWeekAway = (dateString) => {
  return moment.utc(getTodayFormatted()).add(7, 'd').isBefore(moment.utc(dateString));
};

const isPastDue = dateString => moment(getTodayFormatted()).isAfter(moment.utc(dateString)); // today or past

const isWithinOneWeekAway = (dateString) => {
  return moment.utc(dateString).isBetween(getTodayFormatted(), moment.utc().add(7, 'd').format('YYYY-MM-DD'));
};

const getDiaries = state => state.diaries;

const getResource = (state, resource) => resource;

const getDueStatus = (due) => {
  if (isWithinOneWeekAway(due)) return 'Due Soon';
  else if (isPastDue(due)) return 'Past Due';
  else if (isGreaterThanOneWeekAway(due)) return 'Upcoming';
  return 'Unknown';
};

const groupDiaries = (diaries) => {
  if (!diaries || diaries.length === 0) {
    return {
      upComing: [],
      pastDue: [],
      dueSoon: [],
      count: 0
    };
  }
  return {
    dueSoon: diaries.filter(e => isWithinOneWeekAway(e.due)),
    pastDue: diaries.filter(e => isPastDue(e.due)),
    upComing: diaries.filter(e => isGreaterThanOneWeekAway(e.due)),
    count: diaries.length
  };
};

export const getFormattedDiaries = createSelector(
  [getDiaries],
  (diaries) => {
    return diaries.map(d => ({
      diaryId: d._id,
      resourceType: d.resource.type,
      resourceId: d.resource.id,
      ...d.entries[0],
      due: moment.utc(d.entries[0].due).format('YYYY-MM-DD')
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
      due: moment.utc(d.entries[0].due).format('YYYY-MM-DD'),
      dueStatus: getDueStatus(d.entries[0].due),
      action: {
        diaryId: d._id,
        resourceType: d.resource.type,
        resourceId: d.resource.id,
        ...d.entries[0],
        due: moment.utc(d.entries[0].due).format('YYYY-MM-DD')
      }
    }));
  }
);

export const getFilterOpenDiariesByResource = createSelector(
  [getResource, getFormattedDiaries],
  (resource, formattedDairies) => {
    if (!Array.isArray(formattedDairies)) return [];
    return formattedDairies.filter(d => d.open === true && (d.resourceType.toLowerCase() === resource.toLowerCase()));
  }
);

export const getFilteredAllDiaries = createSelector(
  [getResource, getFormattedAllDiaries],
  (resource, formattedDairies) => {
    if (!Array.isArray(formattedDairies)) return [];
    return formattedDairies.filter(d => d.resourceType.toLowerCase() === resource.toLowerCase());
  }
);

export const getOpenDiaries = createSelector([getFormattedDiaries], diaries => groupDiaries(diaries));

export const getFilteredOpenDiaries = createSelector([getFilterOpenDiariesByResource], diaries => groupDiaries(diaries));

