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
    dataTest: 'contactType',
    label: 'Contact',
    type: 'select',
    values: [
      { value: 'Agent' },
      { value: 'Policyholder' },
      { value: 'Inspector' },
      { value: 'Other' }
    ],
    required: true
  },
  {
    placeholderText: 'Note Content',
    required: true,
    value: 'Test note content'
  },
  {
    dataTest: 'fileType',
    label: 'File Type',
    type: 'select',
    values: [
      { value: '4-pt Inspection' },
      { value: 'Claims Documentation' },
      { value: 'Correspondence' },
      { value: 'Elevation Certificate' },
      { value: 'Flood Selection Form' },
      { value: 'Flood Waiver Form' },
      { value: 'HUD Statement' },
      { value: 'New Business Application' },
      { value: 'Other' }
    ],
    required: true
  }
];

describe('Note Uploader Testing', () => {
  const baseProps = {
    handleSubmit: x => x,
    noteType: 'Quote Note',
    submitting: false,
    documentId: '12-345-67'
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
      form: 'NoteUploader'
    })(NoteUploader);

    const { getByTestId, getByPlaceholderText } = renderWithForm(
      <NoteUploaderForm {...props} />,
      { state }
    );

    noteFileModalFields.forEach(field => {
      if (field.type === 'select') {
        checkLabel(getByTestId, field);
        checkSelect(getByTestId, field);
      }
      if (field.type === 'text') {
        checkLabel(getByPlaceholderText, field);
        checkTextInput(getByPlaceholderText, field);
      }
    });
  });
});
