import React from 'react';
import { shallow } from 'enzyme';

import { Address } from './Address';

describe('Testing Address component', () => {
  it('should render', () => {
    const props = {
      showCounty: true,
      territoryManagers: [{
        _id: '5b7db9f6ff54fd6a5c619ee8',
        territory: 'Northeast',
        name: 'Jodi Kelley',
        phoneNumber: '8134195220',
        emailAddress: 'jkelley@hcpci.com',
        states: [
          {
            state: 'FL',
            counties: [
              {
                county: 'NASSAU'
              },
              {
                county: 'DUVAL'
              },
              {
                county: 'SAINT JOHNS'
              },
              {
                county: 'FLAGLER'
              },
              {
                county: 'VOLUSIA'
              },
              {
                county: 'SEMINOLE'
              },
              {
                county: 'ORANGE'
              },
              {
                county: 'CLAY'
              },
              {
                county: 'ALACHUA'
              },
              {
                county: 'MARION'
              }
            ]
          }
        ]
      }],
      changeField() {},
      section: 'mailingAddress',
      searchSettingsByCSPAndZipAction() { return Promise.resolve([{ county: 'ALACHUA', state: 'FL' }]); }
    };
    const wrapper = shallow(<Address {...props} />);
    expect(wrapper).toBeTruthy();
    const wi = wrapper.instance();
    wi.normalizeZipCode('33607', '', { mailingAddress: {} });
    wi.normalizeSameAsMailing(false);
    wi.normalizeSameAsMailing(true);
    const tm1 = wi.filterTerritoryManager('FL', 'MARION');
    const tm2 = wi.filterTerritoryManager('FAKE_STATE', 'FAKE_COUNTY');
    expect(tm1).toBeTruthy();
    expect(tm2).toBeFalsy();
  });
});
