import React from 'react';
import { mount, shallow } from 'enzyme/build';

import DetailsHeader from './DetailsHeader';
import Section from './DetailSection';
import SectionSingle from './DetailSectionSingle';
import MapLink from './MapLink';

const CONFIG = {
  policy: {
    detailsFields: {
      showEffectiveDateButton: true,
      showReinstateButton: true,
      fields: [
        { value: 'policyHolder', component: 'Section' },
        { value: 'mailingAddress', component: 'Section' },
        { value: 'propertyAddress', component: 'Section' },
        { value: 'county' },
        { value: 'territory' },
        { value: 'constructionType' },
        { value: 'effectiveDate' },
        { value: 'cancellationDate' },
        { label: 'Final Payment', value: 'finalPayment' },
        { value: 'currentPremium', className:'premium' }
      ]
    }
  },
  quote: {
    detailsFields: {
      fields: [
        { value: 'policyHolder', component: 'Section' },
        { value: 'mailingAddress', component: 'Section' },
        { value: 'propertyAddress', component: 'Section' },
        { value: 'county', label: 'Property County' },
        { value: 'territory' },
        { value: 'constructionType' },
        { value: 'effectiveDate', className: 'quoteEffectiveDate'},
        { value: 'currentPremium', label: 'Premium', className:'premium' }
      ]
    }
  }
};

describe('Test DetailsHeader component', () => {
  const props = {
    context: 'policy',
    detailsFields: CONFIG.policy.detailsFields,
    modalHandlers: { 
      showEffectiveDateChangeModal: () => {},
      showReinstatePolicyModal: () => {} 
    },
    headerDetails: {
      cancellation: {
        dateLabel: 'Expiration Date', 
        cancellationDate: '', 
        showReinstatement: false
      },
      constructionType: 'MASONRY',
      county: 'SARASOTA',
      currentPremium: '$1,462',
      details: { product: 'HO3 Homeowners' },
      effectiveDate: '01/14/2019',
      finalPayment: { value: undefined, label: undefined },
      mailingAddress: { address1: '4131 TEST ADDRESS', address2: '', csz: 'SARASOTA, FL 00001' },
      mapURI: 'https://www.google.com/maps/search/?api=1&query=4131%20TEST%20ADDRESS%20%20SARASOTA%2C%20FL%2000001',
      policyHolder: { displayName: 'BATMAN ROBIN A001', phone: '(727) 123-1234' },
      policyID: 'testid',
      policyNumber: 'testnumber',
      propertyAddress: { address1: '4131 TEST ADDRESS', address2: '', csz: 'SARASOTA, FL 00001' },
      sourceNumber: '12-5153174-01',
      status: 'Policy Issued / No Payment Received',
      territory: '715-51'
    }
  };

  it('renders without crashing', () => {
    const wrapper = mount(<DetailsHeader {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('contains a DetailsBlock', () => {
    const wrapper = mount(<DetailsHeader {...props} />);
    expect(wrapper.find('DetailsBlock').length).toEqual(1);
  });

  it('contains three DetailSections', () => {
    const wrapper = mount(<DetailsHeader {...props} />);
    expect(wrapper.find('DetailSection').length).toEqual(3);
  });

  it('contains seven DetailSectionSingles', () => {
    const wrapper = mount(<DetailsHeader {...props} />);
    expect(wrapper.find('DetailSectionSingle').length).toEqual(7);
  });

  it('contains two EditButtons', () => {
    const wrapper = mount(<DetailsHeader {...props} />);
    expect(wrapper.find('EditButton').length).toEqual(2);
  });
});