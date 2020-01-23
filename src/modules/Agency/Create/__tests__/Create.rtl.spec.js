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
  checkButton
} from '../../../test-utils';
import { Create } from '../Create';

const pageHeaders = [
  { text: 'Details' },
  { text: 'Address' },
  { text: 'Officer' },
  { text: 'Contact' },
  { text: 'Agent Of Record' }
];

describe('Testing the Create Agency Page', () => {
  const props = {
    ...defaultCreateAgencyProps
  };

  it('POS:Checks Headers', () => {
    const { getByText } = renderWithForm(<Create {...props} />);
    pageHeaders.forEach(header => checkHeader(getByText, header));
  });
});
