import React from 'react';
import { shallow } from 'enzyme';

import { Address } from './Address';

describe('Testing Address component', () => {
  it('should render', () => {
    const props = {
      listAnswersAsKey: [],
      showCounty: true,
      territoryManagers: [
        {
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
        }
      ],
      changeField() {},
      section: 'mailingAddress',
      searchSettingsByCSPAndZipAction() {
        return Promise.resolve([{ county: 'ALACHUA', state: 'FL' }]);
      }
    };
    const wrapper = shallow(<Address {...props} />);
    expect(wrapper).toBeTruthy();
  });
});
