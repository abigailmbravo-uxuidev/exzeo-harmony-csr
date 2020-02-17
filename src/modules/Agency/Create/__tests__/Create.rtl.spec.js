import React from 'react';
import { fireEvent, within } from '@testing-library/react';

import {
  defaultCreateAgencyProps,
  renderWithForm,
  mockServiceRunner,
  detailsFields,
  addressFields,
  contactFields,
  agentOfRecordFields,
  licenseFields,
  principalFields
} from '../../../../test-utils';
import { Create } from '../Create';

describe('Testing the Create Agency Page', () => {
  const props = {
    ...defaultCreateAgencyProps
  };

  mockServiceRunner([]);

  it('POS:Checks Headers and fields', () => {
    const { getByText, getByTestId } = renderWithForm(<Create {...props} />);

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
      .forEach(field => {
        expect(getByTextWithinDetails(field.label));
      });
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
      .forEach(field => {
        expect(getByTextWithinLicense(field.label));
      });
  });

  it('NEG:All Required Fields Error', () => {
    const { getByTestId } = renderWithForm(<Create {...props} />);

    const { getByTestId: getByTestIdWithinDetails } = within(
      getByTestId('agency-details')
    );
    const { getByTestId: getByTestIdWithinAddress } = within(
      getByTestId('agency-address-section')
    );
    const { getByTestId: getByTestIdWithinMailing } = within(
      getByTestIdWithinAddress('agency-mailing-address')
    );
    const { getByTestId: getByTestIdWithinPhysical } = within(
      getByTestIdWithinAddress('agency-physical-address')
    );
    const { getByTestId: getByTestIdWithinPrincipal } = within(
      getByTestId('agency-principal')
    );
    const { getByTestId: getByTestIdWithinContact } = within(
      getByTestId('agency-contact')
    );
    const { getByTestId: getByTestIdWithinAOR } = within(
      getByTestId('agent-of-record')
    );

    const checkError = (getByTestIdFunc, field) => {
      const selectedField = getByTestIdFunc(field.dataTest);
      fireEvent.change(selectedField, { target: { value: '' } });
      fireEvent.blur(selectedField);
      expect(getByTestIdFunc(`${field.dataTest}_error`)).toHaveTextContent(
        'Field Required'
      );
    };

    detailsFields
      .filter(field => field.required)
      .forEach(field => checkError(getByTestIdWithinDetails, field));
    addressFields
      .filter(field => field.required)
      .forEach(field => checkError(getByTestIdWithinMailing, field));
    addressFields
      .filter(field => field.required && field.dataTest !== 'zip')
      .forEach(field => checkError(getByTestIdWithinPhysical, field));
    contactFields
      .filter(field => field.required)
      .forEach(field => checkError(getByTestIdWithinContact, field));
    principalFields
      .filter(field => field.required)
      .forEach(field => checkError(getByTestIdWithinPrincipal, field));
    agentOfRecordFields
      .filter(field => field.required)
      .forEach(field => checkError(getByTestIdWithinAOR, field));
  });
});
