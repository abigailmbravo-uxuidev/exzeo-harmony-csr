import moment from 'moment';

import { callService } from '@exzeo/core-ui/src/@Harmony';
import * as types from './actionTypes';
import { setAppError } from './error.actions';

const removeTerm = id =>
  id.replace ? id.replace(/(\d{2}-\d{7})-\d{2}/g, (_, group) => group) : id;

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

/**
 *
 * @param numberType
 * @returns {Object}
 */
export function fetchNoteOptions(numberType) {
  const notesConfig = {
    exchangeName: 'harmony',
    routingKey: 'harmony.note.getNoteOptions',
    data: { data: { numberType } }
  };

  try {
    // const noteOptions = await callService(notesConfig, 'getNoteOptions'),
    const noteOptions = {
      validContactTypes: ['Agent', 'Policyholder', 'Inspector', 'Other'],
      validFileTypes: [
        '4-pt Inspection',
        'Claims Documentation',
        'Correspondence',
        'Elevation Certificate',
        'Flood Selection Form',
        'Flood Waiver Form',
        'HUD Statement',
        'New Business Application',
        'Other',
        'Proof Of Prior Insurance',
        'Proof Of Repair',
        'Property Inspection',
        'Protection Device Certificate',
        'Quote Summary',
        'Reinstatement Correspondence',
        'Replacement Cost Estimator',
        'Roof Inspection/permit',
        'Sinkhole Loss Questionnaire',
        'Sinkhole Selection/rejection Form',
        'Wind Exclusion',
        'Wind Mitigation'
      ]
    };
    return noteOptions;
  } catch (err) {
    return err;
  }
}
