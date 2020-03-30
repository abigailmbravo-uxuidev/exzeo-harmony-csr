import moment from 'moment-timezone';
import { date } from '@exzeo/core-ui';

export const mergeNotes = (notes, files) => {
  const fileList = notes
    .reduce((list, note) => [...list, ...note.noteAttachments], [])
    .map(n => n.fileUrl);

  const getTerm = number =>
    number && number.includes('-') ? Number(number.split('-').pop()) : 1;

  const fileNotes = files.reduce((filtered, file) => {
    if (!fileList.includes(file.fileUrl)) {
      const newNote = {
        _id: file.envelopeId ? file.envelopeId : file.fileUrl,
        contactType: 'system',
        term: getTerm(file.policyNumber),
        createdBy: { userName: 'System', userId: file.createdBy },
        createdAt: moment.unix(file.createdDate),
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
    term: getTerm(note.number),
    ...note
  }));
  return [...upDatedNotes, ...fileNotes];
};

export const filterNotesByType = (notes, type) => {
  if (!Array.isArray(notes)) return [];
  return type
    ? notes.filter(n => n.noteAttachments.length > 0)
    : notes.filter(n => n.noteContent);
};

export const toTitleCase = str => {
  return str
    .toLowerCase()
    .split(' ')
    .map(s => s.replace(s[0], s[0].toUpperCase()))
    .join(' ');
};

export const getFileName = a =>
  a.fileName ? a.fileName : a.fileUrl.substring(a.fileUrl.lastIndexOf('/') + 1);

export const showCreatedBy = createdBy => (createdBy ? createdBy.userName : '');

export const attachmentCount = attachments =>
  attachments ? attachments.length : 0;

export const formatNote = note => (note ? note.replace(/\r|\n/g, '<br>') : '');

export const attachmentFilter = cell =>
  cell.length > 0 ? cell[0].fileName : null;

export const formatCreatedDate = createdDate =>
  date.formattedLocalDate(createdDate);

export const sortByOrder = (a, b, order) => {
  return order === 'desc' ? (a > b ? 1 : -1) : a < b ? 1 : -1;
};

export const sortCreatedDate = (a, b, order) => {
  return sortByOrder(
    date.formattedLocalDate(a.createdAt),
    date.formattedLocalDate(b.createdAt),
    order
  );
};

export const sortAuthor = (a, b, order) => {
  if (!a.createdBy || !b.createdBy) return order === 'desc' ? -1 : 1;
  return sortByOrder(
    a.createdBy.userName.toLowerCase(),
    b.createdBy.userName.toLowerCase(),
    order
  );
};

export const sortFiles = (a, b, order) => {
  const fileA =
    a.noteAttachments.length > 0 ? getFileName(a.noteAttachments[0]) : '';
  const fileB =
    b.noteAttachments.length > 0 ? getFileName(b.noteAttachments[0]) : '';
  return sortByOrder(fileA, fileB, order);
};

export const sortFileType = (a, b, order) => {
  return sortByOrder(a.fileType, b.fileType, order);
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
