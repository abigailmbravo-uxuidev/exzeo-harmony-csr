import { date } from '@exzeo/core-ui';

/**
 *
 * @param users
 * @returns {*}
 */
export function formatAssigneesOptions(users) {
  const activeUsers = users.filter(user => !!user.enabled);

  const userList = activeUsers.map(user => ({
    answer: user.userId,
    label: `${user.firstName} ${user.lastName}`,
    type: 'user'
  }));

  return userList.sort((a, b) => {
    const userA = a.label.toUpperCase();
    const userB = b.label.toUpperCase();
    if (userA > userB) return 1;
    if (userA < userB) return -1;
    return 0;
  });
}

/**
 *
 * @param diaryOptions
 * @returns {{reasons: *, tags: *}}
 */
export function formatDiaryOptions(diaryOptions) {
  const options = diaryOptions;
  const diaryReasons = options.reduce((acc, d) => {
    const reasons = d.reasons;
    acc.push(...reasons);
    return acc;
  }, []);

  const diaryTags = options.reduce((acc, d) => {
    const tags = d.tags;
    acc.push(...tags);
    return acc;
  }, []);

  return {
    reasons: removeDuplicates(diaryReasons, 'answer'),
    tags: removeDuplicates(diaryTags, 'answer')
  };
}

/**
 *
 * @param array
 * @param property
 * @returns {*}
 */
function removeDuplicates(array, property) {
  return array.filter((obj, position, filteredArray) => {
    return (
      filteredArray.map(mapObj => mapObj[property]).indexOf(obj[property]) ===
      position
    );
  });
}

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

/**
 *
 * @param diaries
 * @param diaryOptions
 * @returns {*[]|{createdAt: *, resourceId: *, due: *, diaryId: *, reasonLabel: *, resourceType: *}[]}
 */
export const formatDiaries = (diaries, diaryOptions) => {
  if (!Array.isArray(diaries)) return [];

  const sortedDiaries = sortDiariesByDate(diaries);

  return sortedDiaries.map(d => {
    const entry = formatEntry(d.entries[0], diaryOptions.reasonOptions);
    return {
      ...entry,
      _id: d._id,
      resourceType: d.resource.type,
      resourceId: d.resource.id,
      createdAt: d.createdAt,
      due: date.formatDate(d.entries[0].due, date.FORMATS.SECONDARY)
    };
  });
};

/**
 *
 * @param diaries
 * @param diaryOptions
 * @returns {{createdAt, resourceId, diaryHistory, due, dueDateDisplay, diaryId, action: {resourceId, due, diaryId, resourceType}, dueStatus, reasonLabel: *, rowKey: string, resourceType}[]|*[]}
 */
export const formatDiariesForTable = (diaries, diaryOptions) => {
  if (!Array.isArray(diaries) || !Array.isArray(diaryOptions.reasonOptions))
    return [];

  const sortedDiaries = sortDiariesByDate(diaries);

  const diaryList = sortedDiaries.map(d => {
    const entry = formatEntry(d.entries[0], diaryOptions.reasonOptions);
    const diaryHistory = d.entries
      .slice(1)
      .map(e => formatEntry(e, diaryOptions.reasonOptions));
    return {
      ...entry,
      _id: d._id,
      // manually setting this value so we have fine grain control over when the rows update
      rowKey: `${d._id}-${diaryHistory.length > 0 ? 'x' : 'o'}`,
      createdAt: d.createdAt,
      resourceType: d.resource.type,
      resourceId: d.resource.id,
      diaryHistory,
      dueStatus: getDueStatus(d.entries[0].due, entry.open),
      due: d.entries[0].due,
      dueDateDisplay: date.formatDate(d.entries[0].due, date.FORMATS.PRIMARY)
    };
  });

  return diaryList.sort((a, b) => {
    return b.open - a.open;
  });
};

export const filterOpenDiaries = (diaries, diaryOptions) => {
  const formattedDiaries = formatDiaries(diaries, diaryOptions);
  return formattedDiaries.filter(d => d.open === true);
};

export const groupOpenDiaries = (diaries, diaryOptions) => {
  const openDiaries = filterOpenDiaries(diaries, diaryOptions);
  return groupDiaries(openDiaries);
};
