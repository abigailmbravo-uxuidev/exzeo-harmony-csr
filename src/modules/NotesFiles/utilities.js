import moment from 'moment-timezone';

export const removeTerm = id => (id && id.replace) ? id.replace(/(\d{2}-\d{7})-\d{2}/g, (_, group) => group) : id;

export const mergeNotes = (notes, files ) => {
  const fileList = notes.reduce((list, note) => [...list, ...note.noteAttachments], []).map(n => n.fileUrl);
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
    };
    return filtered;
  }, []);
  return [...notes, ...fileNotes];
};
