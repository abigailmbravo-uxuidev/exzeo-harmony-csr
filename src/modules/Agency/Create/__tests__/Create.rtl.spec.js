import React from 'react';
import {
  fireEvent,
  waitForElement,
  wait,
  findAllByLabelText,
  findAllByPlaceholderText,
  findByLabelText
} from '@testing-library/react';

import {
  defaultCreateAgencyProps,
  policyHolder,
  renderWithForm,
  searchAgenciesResult,
  searchAgentsResult,
  jestResolve,
  checkHeader,
  checkLabel,
  checkSelect,
  checkTextInput,
  checkStaticField,
  checkRadio,
  clearText,
  checkError,
  checkOutput,
  checkButton,
  mockServiceRunner,
  detailsFields,
  addressFields,
  contactFields,
  agentOfRecordFields,
  licenseFields,
  territoryManagers,
  zipCodeSettings
} from '../../../../test-utils';
import { Create } from '../Create';
import mockServiceRunnerMultiple from 'test-utils/mockServiceRunnerMultiple';

const pageHeaders = [
  { text: 'Details' },
  { text: 'Address' },
  { text: 'Officer' },
  { text: 'Contact' },
  { text: 'Agent Of Record' }
];

const allFields = [
  ...detailsFields,
  ...addressFields,
  {
    type: 'select',
    required: true,
    label: 'Territory Managers',
    dataTest: 'territoryManager',
    value: '5b7db9f6ff54fd6a5c619eed'
  },
  ...contactFields,
  ...agentOfRecordFields,
  ...licenseFields
];

describe('Testing the Create Agency Page', () => {
  const props = {
    ...defaultCreateAgencyProps
  };

  mockServiceRunner([]);

  it('POS:Checks Headers and fields', () => {
    const { getByText, getByTestId } = renderWithForm(<Create {...props} />);
    pageHeaders.forEach(header => checkHeader(getByText, header));

    allFields
      .filter(field => field.visible !== false)
      .forEach(field => checkLabel(getByTestId, field));
  });

  it('NEG:All Required Fields Error', () => {
    const { getByTestId } = renderWithForm(<Create {...props} />);

    allFields
      .filter(
        ({ required, disabled, type }) =>
          required && !disabled && type === 'text'
      )
      .forEach(field => {
        clearText(getByTestId, field);
        fireEvent.blur(getByTestId(field.dataTest));
        checkError(getByTestId, field);
      });
  });

  it('POS:Create Fields', () => {
    const { getByTestId } = renderWithForm(<Create {...props} />);

    [
      ...detailsFields,
      ...addressFields,
      ...contactFields,
      ...agentOfRecordFields,
      ...licenseFields
    ].forEach(field => {
      if (!field.value) return;
      if (field.type === 'text') return checkTextInput(getByTestId, field);
      if (field.type === 'select') return checkSelect(getByTestId, field);
      if (field.type === 'radio') return checkRadio(getByTestId, field);
    });
  });
});
