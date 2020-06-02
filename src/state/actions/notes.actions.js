import { callService } from '@exzeo/core-ui/src/@Harmony';
import { removeTerm } from '../../utilities/format';
import * as types from './actionTypes';
import { setAppError } from './error.actions';
import { date } from '@exzeo/core-ui';

const mergeNotes = (notes, files) => {
  const fileList = notes
    .reduce((list, note) => [...list, ...note.noteAttachments], [])
    .map(n => n.fileUrl);
  const fileNotes = files.reduce((filtered, file) => {
    if (!fileList.includes(file.fileUrl)) {
      const newNote = {
        _id: file.envelopeId ? file.envelopeId : file.fileUrl,
        contactType: 'system',
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
  return [...notes, ...fileNotes];
};

/**
 *
 * @param notes
 * @returns {{notes: *, type: string}}
 */
export function setNotes(notes) {
  return {
    type: types.SET_NOTES,
    notes
  };
}

/**
 *
 * @param numbers
 * @param numberType
 * @returns {Function}
 */
export function fetchNotes(numbers, numberType) {
  const notesQuery = numbers.map((number, i) => {
    const noteType = i === 0 ? numberType : 'quoteNumber';
    return { number: removeTerm(number), numberType: noteType };
  });

  const filesQuery = numbers.map(number => removeTerm(number)).join(',');

  const notesConfig = {
    exchangeName: 'harmony',
    routingKey: 'harmony.note.getNotes',
    data: { data: notesQuery }
  };

  const filesConfig = {
    service: 'file-index',
    method: 'GET',
    path: `v1/fileindex/${filesQuery}`
  };

  return async dispatch => {
    try {
      const [notes, files] = await Promise.all([
        await callService(notesConfig, 'fetchNotes'),
        numberType === 'policyNumber'
          ? callService(filesConfig, 'fetchFiles')
          : []
      ]);
      const allNotes = files.data
        ? mergeNotes(notes.data.result, files.data.result)
        : notes.data.result;

      return dispatch(setNotes(allNotes));
    } catch (err) {
      return dispatch(setAppError(err));
    }
  };
}
