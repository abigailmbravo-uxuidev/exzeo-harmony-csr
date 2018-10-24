import moment from 'moment-timezone';
import { date } from '@exzeo/core-ui/lib';

const isGreaterThanOneWeekAway = (dateString) => {
  return moment.utc(date.currentDay(date.FORMATS.SECONDARY))
    .add(7, 'd')
    .isBefore(moment.utc(dateString));
};

const isPastDue = dateString => moment(date.currentDay(date.FORMATS.SECONDARY)).isAfter(moment.utc(dateString)); // today or past

const isWithinOneWeekAway = (dateString) => {
  return moment.utc(dateString)
    .isBetween(date.currentDay(date.FORMATS.SECONDARY), moment.utc().add(7, 'd').format(date.FORMATS.SECONDARY));
};

export const getDueStatus = (due, open) => {
  if (!open) return 'closed';
  else if (isWithinOneWeekAway(due)) return 'dueSoon';
  else if (isPastDue(due)) return 'pastDue';
  else if (isGreaterThanOneWeekAway(due)) return 'upComing';
  return 'unknown';
};

export const groupDiaries = (diaries) => {
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
