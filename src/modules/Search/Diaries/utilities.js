import { calculateDecorator, date } from '@exzeo/core-ui';
import { formatEntry, getDueStatus } from '../../Diaries/utilities';

export const transferDiariesCalculator = calculateDecorator(
  {
    field: 'selectAll',
    updates: (value, fieldName, allValues, prevValues) => {
      const diariesFields = Object.keys(allValues.diaries);
      const checkedDiaries = diariesFields.filter(
        diaryId => allValues.diaries[diaryId] === true
      );
      const allDiariesChecked = checkedDiaries.length === diariesFields.length;
      const updates = {};

      if (value === true && !allDiariesChecked) {
        diariesFields.forEach(diaryId => {
          updates[`diaries[${diaryId}]`] = true;
        });
      }

      if (value === false && allDiariesChecked) {
        if (prevValues.selectAll === true) {
          diariesFields.forEach(diaryId => {
            updates[`diaries[${diaryId}]`] = false;
          });
        }
      }

      return updates;
    }
  },
  {
    field: /diaries\.\w+/,
    updates: {
      selectAll: (value, allValues) => {
        const diariesFields = Object.keys(allValues.diaries);
        const checkedDiaries = diariesFields.filter(
          diaryId => allValues.diaries[diaryId] === true
        );
        const allDiariesChecked =
          checkedDiaries.length === diariesFields.length;

        if (
          value === false &&
          checkedDiaries.length === diariesFields.length - 1
        ) {
          return false;
        }
        if (value === true && allDiariesChecked) {
          return true;
        }
      }
    }
  }
);

/**
 *
 * @param value
 * @returns {undefined|String}
 */
export function isValidRange(value) {
  const { min, max } = value;
  if (!min && !max) return undefined;

  return date.moment(min).isSameOrBefore(max)
    ? undefined
    : 'Not a valid date range';
}

/**
 * Format diaries for UI List
 * @param diaries
 * @param product
 * @param reasonOptions
 */
export function formatDiariesResults(diaries = [], product, reasonOptions) {
  const filteredDiaries = product
    ? diaries.filter(diary => diary.resource.product === product)
    : diaries;
  const sortedDiaries = filteredDiaries.sort((a, b) => {
    return new Date(a.entries[0].due) - new Date(b.entries[0].due);
  });

  return sortedDiaries.map(diary => {
    const latestEntry = diary.entries[0];
    const formattedEntry = formatEntry(latestEntry, reasonOptions);

    return {
      _id: diary._id,
      resourceType: diary.resource.type,
      resourceId: diary.resource.id,
      assignee: formattedEntry.assignee.displayName,
      reason: formattedEntry.reasonLabel,
      message: formattedEntry.message.split(/\r|\n/g),
      dueStatus: getDueStatus(latestEntry.due, formattedEntry.open),
      dueDate: date.formatDate(latestEntry.due),
      createdBy: formattedEntry.createdBy.userName,
      createdAt: date.formattedDate(formattedEntry.createdAt),
      latestEntry
    };
  });
}

export function handleDiaryClick(resourceId, type) {
  const formattedType = String(type).toLowerCase();
  if (formattedType === 'quote') {
    window.open(`/quote/${resourceId}/coverage`, '_blank');
  } else if (formattedType === 'policy') {
    window.open(`/policy/${resourceId}/coverage`, '_blank');
  } else if (formattedType === 'agency' || formattedType === 'agent') {
    window.open(`/agency/${resourceId}/staff`, '_blank');
  }
}
