import moment from 'moment-timezone';
import { date } from '@exzeo/core-ui';

export const removeTerm = id => {
  if (!id) return id;

  const group = String(id).split('-');
  if (group.length === 1) return id;

  group.pop();
  return group.join('-');
};

export const mergeNotes = (notes, files) => {
  const fileList = notes
    .reduce((list, note) => [...list, ...note.noteAttachments], [])
    .map(n => n.fileUrl);
  const fileNotes = files.reduce((filtered, file) => {
    if (!fileList.includes(file.fileUrl)) {
      const newNote = {
        _id: file.envelopeId ? file.envelopeId : file.fileUrl,
        contactType: 'system',
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
  return [...notes, ...fileNotes];
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

export const attachmentType = attachments =>
  attachments.length > 0 ? toTitleCase(attachments[0].fileType) : '';

export const formatNote = note => (note ? note.replace(/\r|\n/g, '<br>') : '');

export const attachmentFilter = cell =>
  cell.length > 0 ? cell[0].fileName : null;

export const formatCreatedDate = createdDate =>
  date.formattedLocalDate(createdDate);

export const sortAuthor = (a, b, order) => {
  if (!a.createdBy) return order === 'desc' ? -1 : 1;
  if (!b.createdBy) return order === 'desc' ? 1 : -1;
  return order === 'desc'
    ? a.createdBy.userName > b.createdBy.userName
      ? 1
      : -1
    : a.createdBy.userName < b.createdBy.userName
    ? 1
    : -1;
};

export const sortFiles = (a, b, order) => {
  const fileA =
    a.noteAttachments.length > 0 ? getFileName(a.noteAttachments[0]) : '';
  const fileB =
    b.noteAttachments.length > 0 ? getFileName(b.noteAttachments[0]) : '';

  return order === 'desc' ? (fileA > fileB ? 1 : -1) : fileA < fileB ? 1 : -1;
};
