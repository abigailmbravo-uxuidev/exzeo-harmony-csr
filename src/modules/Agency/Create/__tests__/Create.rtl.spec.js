import React from 'react';
import { fireEvent, waitForElement, wait } from 'react-testing-library';

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
  licenseFields
} from '../../../../test-utils';
import { Create } from '../Create';

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
});
