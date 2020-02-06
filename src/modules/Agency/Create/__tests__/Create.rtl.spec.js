import React from 'react';
import { fireEvent, getByLabelText, within } from '@testing-library/react';

import {
  defaultCreateAgencyProps,
  renderWithForm,
  checkHeader,
  checkLabel,
  checkSelect,
  checkTextInput,
  checkRadio,
  clearText,
  checkError,
  mockServiceRunner,
  detailsFields,
  addressFields,
  contactFields,
  agentOfRecordFields,
  licenseFields,
  principalFields
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
  // ...detailsFields,
  // ...addressFields,
  // {
  //   type: 'select',
  //   required: true,
  //   label: 'Territory Managers',
  //   dataTest: 'territoryManager',
  //   value: '5b7db9f6ff54fd6a5c619eed'
  // },
  // ...contactFields,
  // ...agentOfRecordFields,
  // ...licenseFields
];

describe('Testing the Create Agency Page', () => {
  const props = {
    ...defaultCreateAgencyProps
  };

  mockServiceRunner([]);

  it('POS:Checks Headers and fields', () => {
    const { getByText, getByLabelText, getByTestId } = renderWithForm(
      <Create {...props} />
    );

    expect(getByText('Details'));
    expect(getByText('Officer'));
    expect(getByText('Contact'));
    expect(getByText('Agent Of Record'));
    expect(getByText('Address'));

    const { getByText: getByTextWithinDetails } = within(
      getByTestId('agency-details')
    );
    const { getByTestId: getByTestIdWithinAddress } = within(
      getByTestId('agency-address-section')
    );
    const { getByText: getByTextWithinMailing } = within(
      getByTestIdWithinAddress('agency-mailing-address')
    );
    const { getByText: getByTextWithinPhysical } = within(
      getByTestIdWithinAddress('agency-physical-address')
    );
    const { getByText: getByTextWithinPrincipal } = within(
      getByTestId('agency-principal')
    );
    const { getByText: getByTextWithinContact } = within(
      getByTestId('agency-contact')
    );
    const { getByText: getByTextWithinAOR } = within(
      getByTestId('agent-of-record')
    );
    const { getByText: getByTextWithinLicense } = within(
      getByTestId('agent-of-record-license')
    );

    detailsFields
      .filter(field => field.visible !== false)
      .forEach(field => expect(getByTextWithinDetails(field.label)));
    addressFields
      .filter(field => field.visible !== false)
      .forEach(field => expect(getByTextWithinMailing(field.label)));
    addressFields
      .filter(field => field.visible !== false)
      .forEach(field => expect(getByTextWithinPhysical(field.label)));
    contactFields
      .filter(field => field.visible !== false)
      .forEach(field => expect(getByTextWithinContact(field.label)));
    principalFields
      .filter(field => field.visible !== false)
      .forEach(field => expect(getByTextWithinPrincipal(field.label)));
    agentOfRecordFields
      .filter(field => field.visible !== false)
      .forEach(field => expect(getByTextWithinAOR(field.label)));
    licenseFields
      .filter(field => field.visible !== false)
      .forEach(field => expect(getByTextWithinLicense(field.label)));
  });

  // it('NEG:All Required Fields Error', () => {
  //   const { getByTestId } = renderWithForm(<Create {...props} />);

  //   allFields
  //     .filter(
  //       ({ required, disabled, type }) =>
  //         required && !disabled && type === 'text'
  //     )
  //     .forEach(field => {
  //       clearText(getByTestId, field);
  //       fireEvent.blur(getByTestId(field.dataTest));
  //       checkError(getByTestId, field);
  //     });
  // });

  // it('POS:Create Fields', () => {
  //   const { getByTestId } = renderWithForm(<Create {...props} />);

  //   [
  //     ...detailsFields,
  //     ...addressFields,
  //     ...contactFields,
  //     ...agentOfRecordFields,
  //     ...licenseFields
  //   ].forEach(field => {
  //     if (!field.value) return;
  //     if (field.type === 'text') return checkTextInput(getByTestId, field);
  //     if (field.type === 'select') return checkSelect(getByTestId, field);
  //     if (field.type === 'radio') return checkRadio(getByTestId, field);
  //   });
  // });
});
