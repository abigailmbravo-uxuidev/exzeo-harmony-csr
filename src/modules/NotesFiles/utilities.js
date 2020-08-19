import { date } from '@exzeo/core-ui';

export const mergeNotes = (notes, files) => {
  const fileList = notes
    .reduce((list, note) => [...list, ...note.noteAttachments], [])
    .map(n => n.fileUrl);

  const getTerm = number =>
    number && number.includes('-') ? Number(number.split('-').pop()) : 1;

  const formatAttachments = (noteAttachments = []) =>
    noteAttachments.map(attachment => ({
      ...attachment,
      fileName:
        attachment?.fileName ??
        attachment.fileUrl.substring(attachment.fileUrl.lastIndexOf('/') + 1)
    }));

  const fileNotes = files.reduce((filtered, file) => {
    if (!fileList.includes(file.fileUrl)) {
      const newNote = {
        _id: file.envelopeId ? file.envelopeId : file.fileUrl,
        contactType: 'system',
        term: getTerm(file.policyNumber),
        createdBy: { userName: 'System', userId: file.createdBy },
        createdAt: date.moment.unix(file.createdDate),
        noteAttachments: [
          {
            fileType: 'System',
            fileName: file.fileName,
            fileUrl: file.fileUrl
          }
        ]
      };
      filtered.push(newNote);
    }
    return filtered;
  }, []);

  const upDatedNotes = notes.map(note => ({
    ...note,
    term: getTerm(note.number),
    noteAttachments: formatAttachments(note.noteAttachments)
  }));
  return [...upDatedNotes, ...fileNotes];
};

export const toTitleCase = str => {
  return str
    .toLowerCase()
    .split(' ')
    .map(s => s.replace(s[0], s[0].toUpperCase()))
    .join(' ');
};

export const formatCreatedDate = createdDate =>
  date.formattedLocalDate(createdDate);

export const sortByOrder = (a, b, order) => {
  if (order === 'desc') {
    return a > b ? 1 : -1;
  } else {
    return a < b ? 1 : -1;
  }
};

export const sortByDate = (a, b, order) => {
  const dateA = date.moment.utc(a).unix();
  const dateB = date.moment.utc(b).unix();
  return sortByOrder(dateA, dateB, order);
};

export const sortCaseInsensitive = (a, b, order) => {
  return sortByOrder(a.toLowerCase(), b.toLowerCase(), order);
};

const markupRegex = /<(.+?)>/; // Trying to account for various HTML tags at the beginning of the note content
export const sortNoteContent = (a, b, order) => {
  const contentA = a.replace(markupRegex, '').toLowerCase();
  const contentB = b.replace(markupRegex, '').toLowerCase();

  return sortByOrder(contentA, contentB, order);
};

export const sortFiles = (a, b, order) => {
  const fileA = a.length > 0 ? a[0].fileName : '';
  const fileB = b.length > 0 ? b[0].fileName : '';
  return sortByOrder(fileA, fileB, order);
};

export const formatNotes = notes => {
  return notes.map(n => {
    return {
      ...n,
      fileType:
        n.noteAttachments.length > 0
          ? toTitleCase(n.noteAttachments[0].fileType)
          : ''
    };
  });
};

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

export const getDiariesForTable = (diaries, diaryOptions) => {
  if (!Array.isArray(diaries) || !Array.isArray(diaryOptions.reasons))
    return [];

  const sortedDiaries = sortDiariesByDate(diaries);

  const diaryList = sortedDiaries.map(d => {
    const entry = formatEntry(d.entries[0], diaryOptions.reasons);
    const diaryHistory = d.entries
      .slice(1)
      .map(e => formatEntry(e, diaryOptions.reasons));
    return {
      ...entry,
      // manually setting this value so we have fine grain control over when the rows update
      rowKey: `${d._id}-${diaryHistory.length > 0 ? 'x' : 'o'}`,
      diaryId: d._id,
      createdAt: d.createdAt,
      resourceType: d.resource.type,
      resourceId: d.resource.id,
      diaryHistory,
      dueStatus: getDueStatus(d.entries[0].due, entry.open),
      due: d.entries[0].due,
      dueDateDisplay: date.formatDate(d.entries[0].due, date.FORMATS.PRIMARY),
      // deprecated - will refactor this out when moving to using context
      action: {
        diaryId: d._id,
        resourceType: d.resource.type,
        resourceId: d.resource.id,
        ...d.entries[0],
        due: date.formatDate(d.entries[0].due, date.FORMATS.SECONDARY)
      }
    };
  });

  return diaryList.sort((a, b) => {
    return b.open - a.open;
  });
};
