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

export const getFilterDiariesByResource = createSelector(
  [getResource, getFormattedDiaries],
  (resource, formattedDairies) => {
    if (!Array.isArray(formattedDairies)) return [];
    return formattedDairies.filter(d => d.resourceType.toLowerCase() === resource.toLowerCase());
  }
);

export const getOpenDiaries = createSelector([getFormattedDiaries], diaries => groupDiaries(diaries));

export const getFilteredOpenDiaries = createSelector([getFilterDiariesByResource], diaries => groupDiaries(diaries));
