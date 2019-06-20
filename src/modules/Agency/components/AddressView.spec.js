import React from 'react';
import { shallow } from 'enzyme';

import mockAgency from '../mockAgency';

import { AddressView } from './AddressView';

describe('Testing AddressView component', () => {
  it('should render', () => {
    const props = {
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
    const wrapper = shallow(<AddressView {...props} />);
    expect(wrapper).toBeTruthy();
    const wi = wrapper.instance();
  });
});
