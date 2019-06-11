import React from 'react';

import { renderWithReduxAndRouter } from '../../test-utils';
import { AppWrapper } from '../AppWrapper';

describe('Testing AppWrapper', () => {
  const baseProps = {
    match: { params: { policyNumber: '12-1016507-01' }},
    modalHandlers: {},
    onToggleDiaries: () => {},
    openDiaryCount: 0,
    pageTitle: 'P: 12-1016507-01',
    render: () => <div />,
    resourceId: '12-1016507-01',
    resourceType: 'Policy',
    showDiaries: false,
    headerDetails: {
      constructionType: 'MASONRY',
      county: 'SARASOTA',
      currentPremium: '$ 1,234',
      details: { product: 'HO3 Homeowners' },
      effectiveDate: '06/08/2019',
      mailingAddress: {
        address1: '4131 TEST ADDRESS',
        address2: undefined,
        csz: 'SARASOTA, FL 00001'
      },
      policyHolder: { displayName: 'Batman Robin', phone: '(123) 456-7890' },
      policyNumber: undefined,
      propertyAddress: {
        address1: '4131 TEST ADDRESS',
        address2: '',
        csz: 'SARASOTA, FL 00001'
      },
      territory: '715-15'
    },
    header: {
      hideDetailSummary: false,
      fields: [
        { value: "policyHolder", component: "Section", label: "Policyholder" },
        { value: "mailingAddress", component: "Section" },
        { value: "propertyAddress", component: "Section" },
        { value: "county", label: "Property County" },
        { value: "territory" },
        { value: "constructionType" },
        { value: "effectiveDate", className: "quoteEffectiveDate" },
        { value: "currentPremium", label: "Premium", className: "premium" }
      ]
    }
  };

  it('POS:Has a complete policy header', () => {
    const props = {
      ...baseProps,
      context: 'policy',
      headerDetails: {
        ...baseProps.headerDetails,
        policyNumber: '12-1016507-01',
        status: 'Policy Issued / Payment Invoice Issued',
        policyID: '5ceec090667f7b001172bce6',
        finalPayment: {},
        cancellation: {
          label: 'Expiration Date',
          showReinstatement: false,
          value: '06/08/2020'
        },
      }
    };

    const { headerDetails: {
      details,
      policyNumber,
      status,
      policyHolder,
      mailingAddress,
      propertyAddress,
      county,
      effectiveDate,
      territory,
      cancellation,
      constructionType,
      currentPremium
    }} = props;

    const { getByText } = renderWithReduxAndRouter(<AppWrapper {...props} />);
    expect(getByText(details.product));
    expect(getByText(policyNumber));
    expect(getByText(status));
    expect(getByText('Policyholder'));
    expect(getByText(policyHolder.displayName));
    expect(getByText(policyHolder.phone));
    expect(getByText('Mailing Address'));
    expect(getByText(mailingAddress.address1));
    expect(getByText(mailingAddress.csz));
    expect(getByText('Property Address'));
    expect(getByText(propertyAddress.address1));
    expect(getByText(propertyAddress.csz));
    expect(getByText('Property County'));
    expect(getByText(county));
    expect(getByText('Effective Date'));
    expect(getByText(effectiveDate));
    expect(getByText('Territory'));
    expect(getByText(territory));
    // TODO: COLIN -- Check if this is a bug or not
    // expect(getByText(cancellation.label));
    // expect(getByText(cancellation.value));
    expect(getByText('Construction Type'));
    expect(getByText(constructionType));
    expect(getByText('Premium'));
    expect(getByText(currentPremium));
  });

  it('POS:Has a complete quote header', () => {
    const props = {
      ...baseProps,
      context: 'quote',
      headerDetails: {
        ...baseProps.headerDetails,
        details: { ...baseProps.headerDetails.details, quoteNumber: '12-345-67' },
        status: 'Application Sent DocuSign',
        showPolicyLink: false
      }
    };

    const { headerDetails: {
      details,
      status,
      policyHolder,
      mailingAddress,
      propertyAddress,
      county,
      effectiveDate,
      territory,
      constructionType,
      currentPremium
    }} = props;

    const { getByText } = renderWithReduxAndRouter(<AppWrapper {...props} />);
    expect(getByText(details.product));
    expect(getByText(details.quoteNumber));
    expect(getByText(status));
    expect(getByText('Policyholder'));
    expect(getByText(policyHolder.displayName));
    expect(getByText(policyHolder.phone));
    expect(getByText('Mailing Address'));
    expect(getByText(mailingAddress.address1));
    expect(getByText(mailingAddress.csz));
    expect(getByText('Property Address'));
    expect(getByText(propertyAddress.address1));
    expect(getByText(propertyAddress.csz));
    expect(getByText('Property County'));
    expect(getByText(county));
    expect(getByText('Territory'));
    expect(getByText(territory));
    expect(getByText('Construction Type'));
    expect(getByText(constructionType));
    expect(getByText('Effective Date'));
    expect(getByText(effectiveDate));
    expect(getByText('Premium'));
    expect(getByText(currentPremium));
  });

  it('POS:Has a complete Sidenav in Quote', () => {
    const props = {
      ...baseProps,
      context: 'quote'
    };

    const { getByText } = renderWithReduxAndRouter(<AppWrapper {...props} />);
    expect(getByText('Coverage / Rating'));
    expect(getByText('Underwriting'));
    expect(getByText('Additional Interests'));
    expect(getByText('Mailing / Billing'));
    expect(getByText('Notes / Files / Diaries'));
    expect(getByText('Quote Summary'));
    expect(getByText('Application'));
  });

  it('POS:Has a complete Sidenav in Policy', () => {
    const props = {
      ...baseProps,
      context: 'policy'
    };

    const { getByText } = renderWithReduxAndRouter(<AppWrapper {...props} />);
    expect(getByText('Coverage / Rating'));
    expect(getByText('Policyholder / Agent'));
    expect(getByText('Mortgage / Billing'));
    expect(getByText('Notes / Files / Diaries'));
    expect(getByText('Cancel Policy'));
    expect(getByText('Endorsements'));
  });
});
