import React from 'react';
import { reduxForm } from 'redux-form';

import {
  renderWithForm,
  checkLabel,
  checkSelect,
  checkTextInput
} from '../../test-utils';
import { NoteUploader } from '../NoteUploader';

const noteFileModalFields = [
  {
    name: 'contactType',
    label: 'Contact',
    type: 'select',
    values: ['Agent', 'Policyholder', 'Inspector', 'Other'],
    required: true
  },
  {
    placeholder: 'Note Content',
    required: true,
    data: 'Test note content'
  },
  {
    name: 'fileType',
    label: 'File Type',
    type: 'select',
    values: [
      '4-pt Inspection', 'Claims Documentation', 'Correspondence', 'Elevation Certificate',
      'Flood Selection Form', 'Flood Waiver Form', 'HUD Statement', 'New Business Application', 'Other'
    ],
    required: true
  },
];

describe('Note Uploader Testing', () => {
  const baseProps = {
    handleSubmit: x => x,
    noteType: 'Quote Note',
    submitting: false,
    documentId: '12-345-67',
  };

  it('Note/File Modal', () => {
    const props = {
      ...baseProps,
      resourceType: 'Quote'
    };
    const state = {
      notes: [],
      authState: {
        userProfile: {}
      }
    };

    const NoteUploaderForm = reduxForm({
      form: 'NoteUploader',
    })(NoteUploader);

    const { getByTestId, getByPlaceholderText } = renderWithForm(<NoteUploaderForm {...props} />, { state });

    noteFileModalFields.forEach(field => {
      if (field.type === 'select') {
        checkLabel(getByTestId, field);
        checkSelect(getByTestId, field);
      };
      if (field.type === 'text') {
        checkLabel(getByPlaceholderText, field);
        checkTextInput(getByPlaceholderText, field);
      };
    });
  });
});
