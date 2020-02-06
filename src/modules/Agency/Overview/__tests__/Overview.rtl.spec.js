import React from 'react';
import {
  render,
  fireEvent,
  waitForElement,
  wait
} from '@testing-library/react';
import { date, normalize } from '@exzeo/core-ui';
import 'jest-dom/extend-expect';

import {
  renderWithReduxAndRouter,
  mockAgency,
  mockAgents,
  questions
} from '../../../../test-utils';
import Overview from '../index';

describe('Overview testing', () => {
  const state = {
    agencyState: {
      agency: mockAgency,
      agents: mockAgents
    },
    questions: {
      territoryManagers: [
        {
          _id: '5b7db9f6ff54fd6a5c619eec',
          name: 'Tex Dubar'
        }
      ]
    }
  };

  const props = {
    agencyCode: '20532',
    branchCode: '1'
  };

  const checkHeader = (el, buttonText) => {
    expect(el.children[0]).toHaveTextContent(buttonText);
    expect(el.children[0]).toBeEnabled();
    expect(el.children[0].children[0].className).toEqual('fa fa-pencil-square');
  };

  const checkCard = (query, contact) => {
    const phone = `${normalize.phone(contact.primaryPhoneNumber)} ext. ${
      contact.primaryPhoneNumberExtension
    }`;
    const tel = `${contact.primaryPhoneNumber}+${contact.primaryPhoneNumberExtension}`;

    expect(query(`${contact.firstName} ${contact.lastName}`));
    expect(query(contact.emailAddress).closest('a')).toHaveAttribute(
      'href',
      `mailto:${contact.emailAddress}`
    );
    expect(query(phone).closest('a')).toHaveAttribute('href', `tel:${tel}`);
  };

  it('POS:Check Details and Contacts sections', () => {
    const fields = [
      { label: 'Agency ID', value: mockAgency.agencyCode },
      { label: 'Agency Name', value: mockAgency.displayName },
      { label: 'Entity Name', value: mockAgency.legalName },
      { label: 'Status', value: mockAgency.branches[props.branchCode].status },
      { label: 'TPAID', value: mockAgency.tpaid },
      { label: 'OK to Pay', value: mockAgency.okToPay ? 'Yes' : 'No' },
      {
        label: 'Web Address',
        value: mockAgency.branches[props.branchCode].websiteUrl
      },
      { label: 'Tax ID', value: mockAgency.taxIdNumber },
      { label: 'Tax Classification', value: mockAgency.taxClassification },
      {
        label: 'EO Expiration Date',
        value: date.formatDate(mockAgency.eoExpirationDate, 'MM/DD/YYYY')
      },
      {
        label: 'Mail Commission Checks to this Branch',
        value: mockAgency.branches[props.branchCode]
          .mailCommissionChecksToBranch
          ? 'Yes'
          : 'No'
      },
      {
        label: 'Mail Policy Docs to this Branch',
        value: mockAgency.branches[props.branchCode].mailPolicyDocsToBranch
          ? 'Yes'
          : 'No'
      },
      {
        label: 'Phone 1',
        value: normalize.phone(
          mockAgency.branches[props.branchCode].primaryPhoneNumber
        )
      },
      {
        label: 'Phone 2',
        value: normalize.phone(
          mockAgency.branches[props.branchCode].secondaryPhoneNumber
        )
      },
      {
        label: 'Fax',
        value: normalize.phone(mockAgency.branches[props.branchCode].faxNumber)
      },
      { label: 'CSR Email', value: mockAgency.customerServiceEmailAddress }
    ];

    const { getByText } = renderWithReduxAndRouter(<Overview {...props} />, {
      state
    });
    // Check the header
    checkHeader(getByText('Details'), 'Edit');

    // Check the label text/value pairs
    fields.forEach(field => {
      expect(getByText(field.label).nextSibling).toHaveTextContent(field.value);
    });
  });

  it('POS:Check Address section', () => {
    const { getByText, getAllByText } = renderWithReduxAndRouter(
      <Overview {...props} />,
      { state }
    );

    const header = getAllByText('Address');
    const addresses = getAllByText('Address');
    const { mailingAddress: mail, physicalAddress: phys } = mockAgency.branches[
      props.branchCode
    ];
    const mockPhysicalAddress = `${mail.address1}, ${mail.address2}${mail.city}, ${mail.state} ${mail.zip}`;
    const mockMailingAddress = `${phys.address1}, ${phys.address2}${phys.city}, ${phys.state} ${phys.zip}`;
    const tm = state.questions.territoryManagers[0];

    // Check the header, button and icon
    checkHeader(addresses[0], 'Edit');

    // Check Physical Address
    expect(getByText('Physical Address'));
    expect(addresses[1].nextSibling).toHaveTextContent(mockPhysicalAddress);

    //Check Mailing Address
    expect(getByText('Mailing Address'));
    expect(addresses[1].nextSibling).toHaveTextContent(mockMailingAddress);
    expect(addresses[1].nextSibling).toHaveTextContent(mockMailingAddress);
    expect(getByText('County').nextSibling).toHaveTextContent(phys.county);
    expect(getByText('Territory Manager').nextSibling).toHaveTextContent(
      tm.name
    );
  });

  it('POS:Check Cards', () => {
    const { getByText, getAllByText } = renderWithReduxAndRouter(
      <Overview {...props} />,
      { state }
    );
    const { principal, contact } = mockAgency.branches[props.branchCode];
    const aor = state.agencyState.agents[0];

    // Check Officer
    expect(getAllByText('Officer')[0]);
    expect(getAllByText('Officer')[1]);
    checkCard(getByText, principal);

    // Check Contact
    expect(getByText('Contact'));
    checkCard(getByText, contact);

    // Check header
    const { mailingAddress: ma } = aor;
    const phone = `${normalize.phone(
      normalize.phone(aor.primaryPhoneNumber)
    )} ext. ${aor.primaryPhoneNumberExtension}`;
    const tel = `${aor.primaryPhoneNumber}+${aor.primaryPhoneNumberExtension}`;

    expect(getByText('Agent Of Record'));
    expect(getByText(`${aor.firstName} ${aor.lastName}`));
    expect(getByText(aor.licenseNumber));
    expect(
      getByText(
        `${ma.address1}, ${ma.address2}, ${ma.city}, ${ma.state} ${ma.zip}`
      )
    );
    expect(getByText(aor.status));
    //.closest('a')).toHaveAttribute('href', `tel:${tel}`)
    expect(getByText(phone).closest('a')).toHaveAttribute('href', `tel:${tel}`);
    expect(
      getByText(normalize.phone(aor.secondaryPhoneNumber)).closest('a')
    ).toHaveAttribute('href', `tel:${aor.secondaryPhoneNumber}`);
    expect(
      getByText(normalize.phone(aor.faxNumber)).closest('a')
    ).toHaveAttribute('href', `fax:${aor.faxNumber}`);
    expect(getByText(aor.emailAddress).closest('a')).toHaveAttribute(
      'href',
      `mailto:${aor.emailAddress}`
    );
  });
});
