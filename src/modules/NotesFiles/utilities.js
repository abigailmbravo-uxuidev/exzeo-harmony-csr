import { date } from '@exzeo/core-ui';
import { groupDiaries } from '../../utilities/diaries';

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

export const determineSource = document => {
  // Allows us to manually pass in a "document" object, for instance when we are in Agency.
  if (document.sourceType) {
    return {
      sourceNumbers: document.sourceNumbers,
      sourceType: document.sourceType
    };
  }

  // Check for sourceNumber since PolicyNumber is returned for a quote that is Policy Issued
  const sourceNumbers = document.sourceNumber
    ? [document.policyNumber, document.sourceNumber]
    : [document.quoteNumber];
  const sourceType = document.sourceNumber ? 'policyNumber' : 'quoteNumber';

  return {
    sourceNumbers,
    sourceType
  };
};
