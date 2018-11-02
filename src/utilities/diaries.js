import moment from 'moment-timezone';
import { date } from '@exzeo/core-ui/lib';

/**
 * Is date provided more than one week from current date
 * @param dateString
 * @returns {boolean | *}
 */
const isGreaterThanOneWeekAway = (dateString) => {
  return moment.utc(date.currentDay(date.FORMATS.SECONDARY))
    .add(7, 'd')
    .isBefore(moment.utc(dateString));
};

/**
 * Is date provided past current date
 * @param dateString
 * @returns {boolean}
 */
const isPastDue = (dateString) => {
  return moment(date.currentDay(date.FORMATS.SECONDARY))
    .isAfter(moment.utc(dateString));
};

/**
 * Is date provided within one week from current date
 * @param dateString
 * @returns {boolean}
 */
const isWithinOneWeekAway = (dateString) => {
  return moment.utc(dateString)
    .isBetween(date.currentDay(date.FORMATS.SECONDARY), moment.utc().add(7, 'd').format(date.FORMATS.SECONDARY));
};

/**
 * Get status of diary based on due date
 * @param due
 * @param open
 * @returns {string}
 */
export const getDueStatus = (due, open) => {
  if (!open) return 'closed';
  else if (isWithinOneWeekAway(due)) return 'dueSoon';
  else if (isPastDue(due)) return 'pastDue';
  else if (isGreaterThanOneWeekAway(due)) return 'upComing';
  return 'unknown';
};

/**
 * Group diaries by status based on due date
 * @param diaries
 * @returns {*}
 */
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

/**
 * Sort diaries in ascending order by due date
 * @param diaries
 * @returns {Array}
 */
export const sortDiariesByDate = (diaries = []) => {
  return diaries.filter(d => d).sort((a, b) => {
    return new Date(a.entries[0].due) - new Date(b.entries[0].due);
  });
};
