import { date } from '@exzeo/core-ui';

/**
 * Is date provided more than one week from current date
 * @param dateString
 * @returns {boolean | *}
 */
export const isUpcoming = dateString => {
  const sevenDaysOut = date
    .moment()
    .utc()
    .add(7, 'd')
    .format(date.FORMATS.SECONDARY);

  return date.moment(dateString).isAfter(sevenDaysOut, 'd');
};

/**
 * Is date provided within one week from current date
 * @param dateString
 * @returns {boolean}
 */
export const isDueSoon = dateString => {
  const today = date.currentDay(date.FORMATS.SECONDARY);
  const sevenDaysOut = date.moment
    .utc()
    .add(7, 'd')
    .format(date.FORMATS.SECONDARY);

  return date.moment(dateString).isBetween(today, sevenDaysOut, 'd', '[]');
};

/**
 * Is date provided past current date
 * @param dateString
 * @returns {boolean}
 */
export const isPastDue = dateString => {
  const today = date.currentDay(date.FORMATS.SECONDARY);

  return date.moment(dateString).isBefore(today, 'd');
};

/**
 * Is date provided today
 * @param dateString
 * @returns {boolean}
 */
export const isToday = dateString => {
  const today = date.currentDay(date.FORMATS.SECONDARY);

  return date.moment(dateString).isSame(today, 'd');
};

/**
 * format Diary properties
 * @param entry object
 * @param reasonOptions
 * @returns {object}
 */
export const formatEntry = (entry, reasonOptions = []) => {
  const reasonKeyValue = reasonOptions.find(r => r.answer === entry.reason);
  const reasonLabel = reasonKeyValue ? reasonKeyValue.label : entry.reason;
  const due = date.formatDate(entry.due);
  return {
    ...entry,
    due,
    reasonLabel
  };
};

/**
 * Get status of diary based on due date
 * @param due
 * @param open
 * @returns {string}
 */
export const getDueStatus = (due, open) => {
  if (!open) return 'closed';
  else if (isPastDue(due)) return 'pastDue';
  else if (isDueSoon(due)) return 'dueSoon';
  else if (isUpcoming(due)) return 'upComing';
  return 'unknown';
};

/**
 * Group diaries by status based on due date
 * @param diaries
 * @returns {*}
 */
export const groupDiaries = diaries => {
  if (!diaries || diaries.length === 0) {
    return {
      upComing: [],
      pastDue: [],
      dueSoon: [],
      count: 0
    };
  }
  return {
    dueSoon: diaries.filter(e => isDueSoon(e.due)),
    pastDue: diaries.filter(e => isPastDue(e.due)),
    upComing: diaries.filter(e => isUpcoming(e.due)),
    count: diaries.length
  };
};

/**
 * Sort diaries in ascending order by due date
 * @param diaries
 * @param product
 * @returns {Array}
 */
export const sortDiariesByDate = (diaries = [], product) => {
  return diaries
    .filter(d => (product ? d.resource.product === product : d))
    .sort((a, b) => {
      return new Date(a.entries[0].due) - new Date(b.entries[0].due);
    });
};

export const addDate = (days, dateString) => {
  return date.moment
    .utc(dateString)
    .add(days, 'd')
    .format(date.FORMATS.SECONDARY);
};
