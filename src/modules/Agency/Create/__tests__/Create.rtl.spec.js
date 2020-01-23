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

  it('POS: Same as Mailing Address should populate Physical Address', () => {
    const { getByTestId } = renderWithForm(<Create {...props} />);

    addressFields.forEach(({ label, value, dataTest }) =>
      fireEvent.change(getByTestId(dataTest), {
        target: { value }
      })
    );

    fireEvent.click(getByTestId('physicalAddress.sameAsMailing'));

    expect(getByTestId('physicalAddress.address1').value).toEqual(
      getByTestId('mailingAddress.address1').value
    );

    expect(getByTestId('physicalAddress.address2').value).toEqual(
      getByTestId('mailingAddress.address2').value
    );

    expect(getByTestId('physicalAddress.city').value).toEqual(
      getByTestId('mailingAddress.city').value
    );

    expect(getByTestId('physicalAddress.state').value).toEqual(
      getByTestId('mailingAddress.state').value
    );

    expect(getByTestId('physicalAddress.zip').value).toEqual(
      getByTestId('mailingAddress.zip').value
    );
  });
});
