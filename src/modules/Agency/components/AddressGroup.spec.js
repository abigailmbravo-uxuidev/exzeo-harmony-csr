import React from 'react';
import { shallow } from 'enzyme';

import mockAgency from '../mockAgency';

import { AddressGroup } from './AddressGroup';

describe('Testing AddressGroup component', () => {
  it('should render', () => {
    const props = {
      zipCodeSettings: [
        {
          companyCode: 'TTIC',
          county: 'FLAGLER',
          state: 'FL',
          zip: '32164'
        }
      ],
      searchSettingsByCSPAndZipAction() {
        return Promise.resolve([
          {
            companyCode: 'TTIC',
            county: 'FLAGLER',
            state: 'FL',
            zip: '32164'
          }
        ]);
      },
      territoryManagers: [
        {
          _id: '5b7db9f6ff54fd6a5c619eec',
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
        }
      ],
      agencyBranchData: mockAgency,
      showCounty: true,
      changeField() {}
    };
    const wrapper = shallow(<AddressGroup {...props} />);
    expect(wrapper).toBeTruthy();
    const wi = wrapper.instance();

    expect(wi.filterTerritoryManager('FL', 'VOLUSIA')).toEqual(
      props.territoryManagers[0]
    );
    expect(wi.filterTerritoryManager('N/A', 'N/A')).toBeFalsy();

    wi.normalizeSameAsMailing('mailingAddress')('', '', {
      sameAsMailing: true,
      physicalAddress: { state: 'FL' }
    });
    wi.normalizeSameAsMailing('physicalAddress')('', '', {
      sameAsMailing: true,
      physicalAddress: { state: 'FL' }
    });

    wi.setTerritoryManager(props.zipCodeSettings[0]);
    wi.handleStateAndZip('32164', 'FL');
    wi.handleSameAsMailing('a', '', {});
    wi.handleSameAsMailing('a', '', { mailingAddress: {} });
    wi.normalizeState('FL', 'GA', {});
    wi.normalizeZipCode('33617', '33607', {});
  });
});
