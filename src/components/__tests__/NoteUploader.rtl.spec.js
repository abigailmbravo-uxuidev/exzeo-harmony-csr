import React from 'react';
import { waitForElement } from '@testing-library/react';

import {
  render,
  checkLabel,
  checkSelect,
  checkTextInput,
  mockServiceRunner,
  noteOptionsResult
} from '../../test-utils';
import NoteUploader from '../NoteUploader';

mockServiceRunner(noteOptionsResult);

const noteFileModalFields = [
  {
    dataTest: 'contactType',
    label: 'Contact',
    type: 'select',
    values: [
      { value: 'Contact1' },
      { value: 'Contact2' },
      { value: 'Contact3' },
      { value: 'Contact4' }
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
      { value: 'File1' },
      { value: 'File2' },
      { value: 'File3' },
      { value: 'File4' },
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
    documentId: '12-345-67',
    companyCode: 'TTIC',
    product: 'HO3',
    state: 'FL'
  };

  it('Note/File Modal', async () => {
    const props = {
      ...baseProps,
      resourceType: 'Quote'
    };

    const { getByTestId, getByPlaceholderText } = render(
      <NoteUploader {...props} />
    );

    await waitForElement(() => [
      getByTestId('contactType'),
      getByTestId('fileType')
    ]);

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
