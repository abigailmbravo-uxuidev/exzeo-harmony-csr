import React from 'react';
import { shallow } from 'enzyme';

import { TransferModal } from './TransferModal';
import mockAgency from '../mockAgency';

describe('Testing Transfer Modal', () => {
  it('should render Transfer Modal', () => {
    const props = {
      change() {},
      agencyCode: 123,
      clearSelectedPolicies() {},
      getAgentListByAgencyCode() {},
      transferPoliciesToAgent: () => Promise.resolve({}),
      handleSubmit() {},
      toggleModal() {},
      activeAgencyCode: 123,
      agencies: [mockAgency],
      agents: [
        {
          agentCode: 234,
          displayText: 'TestFirst TestLast',
          firstName: 'TestFirst',
          lastName: 'TestLast'
        }
      ],
      selectedPolicies: [
        {
          agencyCode: 11520190220,
          agentCode: 30820191120,
          companyCode: 'TTIC',
          effectiveDate: '2019-03-21T04:00:00.000Z',
          policyHolders: [
            {
              electronicDelivery: false,
              _id: '5c801f6e48942b000e62486c',
              emailAddress: 'exzeoqa@exzeo.com',
              entityType: 'Person',
              firstName: 'BATMAN',
              lastName: 'ROBIN A004',
              order: 0,
              primaryPhoneNumber: '7271231234'
            },
            {
              electronicDelivery: false,
              _id: '5c801f6e48942b000e62486b',
              emailAddress: 'exzeoqa@exzeo.com',
              entityType: 'Person',
              firstName: 'WonderWoman',
              lastName: 'ROBIN A004',
              order: 1,
              primaryPhoneNumber: '8132223344'
            }
          ],
          product: 'HO3',
          property: {
            townhouseRowhouse: false,
            pool: false,
            poolSecured: false,
            divingBoard: false,
            trampoline: false,
            fireAlarm: true,
            burglarAlarm: true,
            sprinkler: 'A',
            gatedCommunity: false,
            _id: '5c801f9e84a0c9000e5ab36c',
            buildingCodeEffectivenessGrading: 6,
            constructionType: 'FRAME',
            distanceToFireHydrant: 0,
            distanceToFireStation: 1.02,
            distanceToTidalWater: 17001.6,
            familyUnits: '1-2',
            floodZone: 'X',
            id: '12000000000000004',
            physicalAddress: {
              _id: '5c801f6184a0c9000e5ab222',
              address1: '9000 TEST ADDRESS',
              address2: 'TEST ADDRESS TWO',
              city: 'JACKSONVILLE',
              county: 'DUVAL',
              latitude: 30.19362,
              longitude: -81.99309,
              state: 'FL',
              zip: '00004'
            },
            protectionClass: 3,
            residenceType: 'SINGLE FAMILY',
            source: 'CasaClue',
            squareFeet: 1262,
            territory: '039-0',
            windMitigation: {
              _id: '5c801f9e84a0c9000e5ab36e',
              floridaBuildingCodeWindSpeed: 105,
              floridaBuildingCodeWindSpeedDesign: 105,
              internalPressureDesign: 'Other',
              openingProtection: 'None',
              roofCovering: 'Non-FBC',
              roofDeckAttachment: 'D',
              roofGeometry: 'Flat',
              roofToWallConnection: 'Double Wraps',
              secondaryWaterResistance: 'No',
              terrain: 'B',
              windBorneDebrisRegion: 'No'
            },
            yearBuilt: 1996,
            yearOfRoof: null
          },
          state: 'FL',
          updatedAt: '2019-03-06T19:39:05.263Z',
          policyNumber: '12-1014458-01',
          policyTerm: 1,
          policyVersion: 3,
          status: 'Policy Issued',
          transactionId: '5c829cf9317b6f000f7a5efe',
          policyID: '5c829cf9317b6f000f7a5efe'
        },
        {
          agencyCode: 11520190220,
          agentCode: 30820191120,
          companyCode: 'TTIC',
          effectiveDate: '2019-03-16T04:00:00.000Z',
          policyHolders: [
            {
              electronicDelivery: false,
              _id: '5c8015c484a0c9000e5aac9f',
              emailAddress: 'exzeoqa@exzeo.com',
              entityType: 'Person',
              firstName: 'BATMAN',
              lastName: 'ROBIN A001',
              order: 0,
              primaryPhoneNumber: '7271231234'
            }
          ],
          product: 'HO3',
          property: {
            townhouseRowhouse: false,
            pool: false,
            poolSecured: false,
            divingBoard: false,
            trampoline: false,
            fireAlarm: false,
            burglarAlarm: false,
            sprinkler: 'N',
            gatedCommunity: false,
            _id: '5c8015e784a0c9000e5aad36',
            buildingCodeEffectivenessGrading: 3,
            constructionType: 'MASONRY',
            distanceToFireHydrant: 264.052744,
            distanceToFireStation: 0.79,
            distanceToTidalWater: 17740.8,
            familyUnits: '1-2',
            floodZone: 'X',
            id: '12000000000000001',
            physicalAddress: {
              _id: '5c8015b984a0c9000e5aac84',
              address1: '4131 TEST ADDRESS',
              address2: '',
              city: 'SARASOTA',
              county: 'SARASOTA',
              latitude: 27.27967,
              longitude: -82.47786,
              state: 'FL',
              zip: '00001'
            },
            protectionClass: 3,
            residenceType: 'SINGLE FAMILY',
            source: 'CasaClue',
            squareFeet: 2640,
            territory: '715-51',
            windMitigation: {
              _id: '5c8015e784a0c9000e5aad38',
              floridaBuildingCodeWindSpeed: 130,
              floridaBuildingCodeWindSpeedDesign: 130,
              internalPressureDesign: 'Other',
              openingProtection: 'Basic',
              roofCovering: 'Other',
              roofDeckAttachment: 'Other',
              roofGeometry: 'Hip',
              roofToWallConnection: 'Other',
              secondaryWaterResistance: 'No',
              terrain: 'B',
              windBorneDebrisRegion: 'Yes'
            },
            yearBuilt: 1998,
            yearOfRoof: null
          },
          state: 'FL',
          updatedAt: '2019-03-06T18:56:06.826Z',
          policyNumber: '12-1014457-01',
          policyTerm: 1,
          policyVersion: 3,
          status: 'Policy Issued',
          transactionId: '5c829cf9317b6f000f7a5edd',
          policyID: '5c829cf9317b6f000f7a5edd'
        }
      ]
    };
    const wrapper = shallow(<TransferModal {...props} />);
    expect(wrapper).toBeTruthy();
    const wi = wrapper.instance();

    wi.componentDidMount();
    wi.submitTransfer({}, fn => fn, props);
    wi.closeModal();
    wi.handleAgencyChange({ target: { value: '' } }, '123');
  });
});
