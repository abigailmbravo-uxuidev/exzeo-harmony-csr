import moment from 'moment';

import { callService } from '../../utilities/serviceRunner';
import * as types from './actionTypes';
import { setAppError } from './error.actions';

const removeTerm = id => id.replace ? id.replace(/(\d{2}-\d{7})-\d{2}/g, (_, group) => group) : id;

const mergeNotes = (notes, files ) => {
  const fileList = notes.reduce((list, note) => [...list, ...note.noteAttachments], []).map(n => n.fileUrl);
  const fileNotes = files.reduce((filtered, file) => {
    if (!fileList.includes(file.fileUrl)) {
      const newNote = {
        _id: file.envelopeId ? file.envelopeId : file.fileUrl,
        contactType: 'system',
        createdBy: { userName: 'System', userId: file.createdBy },
        createdDate: moment.unix(file.createdDate),
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

/**
 * Set Notes
 * @param {array} notes
 * @returns {{type: string, loading: array}}
 */
export function setNotes(notes) {
  return {
    type: types.SET_NOTES,
    notes
  };
}

/**
 *
 * @param filter
 * @returns {Function}
 */
export function fetchNotes(numbers, numberType) {
  const notesQuery = numbers.map(number => ({ number: removeTerm(number), numberType }));
  const filesQuesry = numbers.map(number => number).join(',');

  const notesConfig = {
    exchangeName: 'harmony', 
    routingKey: 'harmony.note.getNotes', 
    data: { data: notesQuery, }
  };

  const filesConfig = {
    service: 'file-index',
    method: 'GET',
    path: `v1/fileindex/${filesQuesry}`
  };

  return async dispatch => {
    try {
      const [notes, files] = await Promise.all([
        await callService(notesConfig, 'fetchNotes'), 
        numberType === 'policyNumber' ? callService(filesConfig, 'fetchFiles') : []
      ]);
      const allNotes = files.data
        ? mergeNotes(notes.data.result, files.data.result)
        : notes.data.result;

      return dispatch(setNotes(allNotes));
    } catch (err) {
      return dispatch(setAppError(err));
    }
  };
};

